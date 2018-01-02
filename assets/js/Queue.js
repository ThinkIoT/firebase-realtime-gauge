
var count = 0;

class Queue
{
    constructor()
    {
        this.items = [];
    }
    
    enqueue(element)
    {    
        this.items.push(element);
        count++;
    }

    dequeue()
    {
        if(this.isEmpty())
            return "Underflow";
        count--;
        return this.items.shift();
        
    }

    front()
    {
        if(this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }
    
    last()
    {
        if(this.isEmpty())
            return "No elements in Queue";
        return this.items[count-1];
    }
    
    isEmpty()
    {
        return this.items.length === 0;
    }

    printQueue()
    {
        var str = "";
        for(var i = 0; i < this.items.length; i++)
            str += this.items[i] +" ";
        return str;
    }
}
