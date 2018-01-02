
var gaugeOptions = {

    chart: {
        type: 'solidgauge'
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

// The Humidity gauge
var chartSpeed = Highcharts.chart('container-hum', Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 10,
        max: 100,
        title: {
            text: 'Humidity'
        }
    },

    credits: {
        enabled: false
    },

    series: [{
        name: 'Humidity',
        data: [0],
        dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                   '<span style="font-size:12px;color:silver">%</span></div>'
        },
        tooltip: {
            valueSuffix: ' %'
        }
    }]

}));

// The Temperature gauge
var chartRpm = Highcharts.chart('container-temp', Highcharts.merge(gaugeOptions, {
    yAxis: {
        min: 1,
        max: 50,
        title: {
            text: 'Temperature'
        }
    },

    series: [{
        name: 'Temperature',
        data: [0],
        dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                   '<span style="font-size:12px;color:silver">°C</span></div>'
        },
        tooltip: {
            valueSuffix: ' °C'
        }
    }]

}));


var myRef = new Firebase('https://testiot-2018.firebaseio.com/');

    myRef.on('child_changed', function(snapshot){
    data = snapshot.val();
    var h = data.Humidity;
    var t = data.Temperature;
    var point, newVal, inc;

    if (chartSpeed) {
        point = chartSpeed.series[0].points[0];
        inc = h;
        newVal = point.y + inc;
        point.update(newVal);
        point.y = 0;
    }

    // Temperature
    if (chartRpm) {
        point = chartRpm.series[0].points[0];
        inc = t;
        newVal = point.y + inc;

        point.update(newVal);
        point.y = 0;
    }
});

