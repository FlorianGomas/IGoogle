class WidgetDate{

    refreshTime = 1000; //Temps de rafraichissement de l'horloge en millisecondes

    constructor(){
        setInterval(this.clockTime,this.refreshTime);
    }

    clockTime(){     
        var timeAndDate = (new Date()).toLocaleString();
        $('#date .dragWindowHeader>p').remove();
        $('#date .dragWindowHeader').append($('<p>'+timeAndDate+'</p>'));
    }
}