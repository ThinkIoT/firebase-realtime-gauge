// @ts-check

var count = 0;
var THqueue = [];
var sEle = [];

var hum = document.querySelector('humidity');
var tem = document.querySelector('temperature');

var t_max = document.querySelector('tmax');
var t_min = document.querySelector('tmin');
var t_avg = document.querySelector('tavg');

var h_max = document.querySelector('hmax');
var h_min = document.querySelector('hmin');
var h_avg = document.querySelector('havg');

var c = document.querySelector('clock');


var pad = function (x) {
    return x < 10 ? '0' + x : x;
}

var ShowClock = function () {
    var d = new Date();
    var h = pad(d.getHours());
    var m = pad(d.getMinutes());
    var s = pad(d.getSeconds());

    c.innerHTML = [h, m, s].join(':');
}

setInterval(ShowClock, 1000);

var tmax = 0,
    tmin = 99,
    tavg, ttotal = 0;
var hmax = 0,
    hmin = 99,
    havg, htotal = 0;

var myRef = new Firebase('https://testiot-2018.firebaseio.com/');

myRef.on('child_changed', function (snapshot) {
    data = snapshot.val();

    var h, t;
    THqueue.push([data.Humidity, data.Temperature]);
    h = THqueue[count][0];
    t = THqueue[count][1];

    ttotal = ttotal + t;
    htotal = htotal + h;

    count = count + 1;

    tavg = Number(ttotal / count).toFixed(2);
    havg = Number(htotal / count).toFixed(2);

    if (t > tmax) {
        tmax = t;
    }
    if (t < tmin) {
        tmin = t;
    }
    if (h > hmax) {
        hmax = h;
    }
    if (h < hmin) {
        hmin = h;
    }

    hum.innerHTML = h;
    tem.innerHTML = t;

    t_max.innerHTML = tmax;
    t_min.innerHTML = tmin;
    t_avg.innerHTML = tavg;

    h_max.innerHTML = hmax;
    h_min.innerHTML = hmin;
    h_avg.innerHTML = havg;

    if (count == 11) {
        sEle[0] = THqueue.shift();
        ttotal -= sEle[0][1];
        htotal -= sEle[0][0];

        count = count - 1;
    }

    var i, j;
    var myTable = document.getElementById('myTable');
    for (i = 1; i <= THqueue.length; i++) {
        myTable.rows[i].cells[0].innerHTML = i;
        myTable.rows[i].cells[1].innerHTML = THqueue[i - 1][0];
        myTable.rows[i].cells[2].innerHTML = THqueue[i - 1][1];
    }


});