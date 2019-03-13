var date = document.getElementById('date');
var slider = document.getElementsByClassName('canvas_slider')[0];

var jsonObj1 = filldata();
var objLength = Object.keys(jsonObj1).length; //Zählt die Anzahl der Objekte

var c = document.getElementById('canvas_1');
var ctx = c.getContext('2d');
ctx.translate(0.5, 0.5);
ctx.fillStyle = "#FFF";
ctx.beginPath();
ctx.strokeStyle = "#000000";
ctx.lineWidth = 2; //Breite der Balken
var objHeight;
for (let i = 1; i <= objLength; i++) {
    objHeight = (jsonObj1[i]*23) % 39; //damit die Balken nicht mehr als 40px hoch sind
    ctx.moveTo(ctx.lineWidth * i, c.height);
    ctx.lineTo(ctx.lineWidth * i, c.height - objHeight);
    ctx.stroke();
}
ctx.closePath();
var bla = [];
c.onmousemove = function (e) {
    var r = c.getBoundingClientRect(),
        x = e.clientX - r.left;
    var day = parseInt(x / 2);
    slider.style.cssText = "display: inline; width: 2px; height: 40px; left: " + x + "px; ";
    if (day != 0)
        //date.innerText = dateFromDay(2018, day).toLocaleDateString();
    bla = getEventsOfDay(day);

    slider.onclick = function () {
        if (day != 0)
            location.href = '#' + day;
    }; //öffnet link.
};

document.getElementById('slider').onmouseleave = function () {
    slider.style.cssText = "display: none;";
}

function filldata() {
    var json = {};
    for (let i = 1; i <= 365; i++) { //erstellt 365 Objekte mit zufälligen Werten bis eine Datenbank steht.
        json[i] = 0 /*Math.floor((Math.random() * 150) + 1)*/;
    }

    for (let i = 0; i < data.datenbank.event.length; i++){
        var datum = new Date(data.datenbank.event[i].veranstaltung.daten.datum);
        json[getDayOfYear(datum)]+=1;
    }

    return json;
}