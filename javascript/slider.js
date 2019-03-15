var date    = document.getElementById('date');
var slider  = document.getElementsByClassName('canvas_slider')[0];
var infoBox = document.getElementById('infobox');

var jsonObj1    = filldata();
var objLength   = Object.keys(jsonObj1).length; //Zählt die Anzahl der Objekte

var c   = document.getElementById('canvas_1');
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

var point = [];

c.onmousemove = function (e) {

    var r = c.getBoundingClientRect(),
        x = e.clientX - r.left;
    var day = parseInt(x / 2);
    slider.style.cssText = "display: inline; width: 2px; height: 40px; left: " + x + "px; ";


    if (day != 0)
        clearGraphics();
    point = getEventsOfDay(day);
    for (let i = 0; i < point.length; i++) {
        //console.log(point[i].longitude);
        drawPoint(point[i].location.long,
            point[i].location.lat,
            point[i].veranstaltung.name,
            point[i].veranstaltung.teilnehmerzahl.teilgenommen);
    }

    slider.onclick = function () {

        if (day != 0) {
            //date.innerText = dateFromDay(2018, day).toLocaleDateString();

            var infoEvents = getEventsOfDay(day);
            txt = "";

            for (let i = 0; i < infoEvents.length; i++) {
                txt += "<p>" + infoEvents[i].veranstaltung.name + " im <strong>"
                    + infoEvents[i].location.gaststaette + "</strong><br>"
                    + "Teilnehmer: " + infoEvents[i].veranstaltung.teilnehmerzahl.teilgenommen + "</p>";
            }
            infoBox.innerHTML = txt;

            //infobox ausschalten, wenn keine Events vorhanden sind. Klick auf leeren 'Stroke'.
            
            if (infoEvents.length == 0) {
                infoBox.style.display = 'none';
            } else {
                infoBox.style.display = 'inline';
            }
        }
    };
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