
function drawSomething()
{
    for (let i = 0; i < events.length; i++) {
        drawPoint(events[i].location.long,
            events[i].location.lat,
            events[i].veranstaltung.name,
            events[i].veranstaltung.teilnehmerzahl.teilgenommen);
        console.log("drawing");
    }
}

function getEntryFeeSortedByDate() {
    var arr = [];
    for (let i = 0; i < data.datenbank.event.length; i++){
        arr.push({
            "index" : i,
            "entryfee" : parseInt(data.datenbank.event[i].veranstaltung.eintritt),
            "date" : data.datenbank.event[i].veranstaltung.daten.datum
        });
    }

    arr = arr.sort(function (a, b) {
        return (a["date"] > b["date"]) ? 1 : ((a["date"] < b["date"]) ? -1 : 0);
    });

    return  arr;
}

function getAverageEntryFeePerDay() {
    var fee = getEntryFeeSortedByDate();

    var days = [];
    var arr = [];
    loop1: for (var i = 0; i < fee.length; i++) {
        var date = fee[i]["date"];
        for (var i2 = 0; i2 < days.length; i2++) {
            if (days[i2] === date) {
                continue loop1;
            }
        }
        days.push(date);
    }

    for (let i = 0; i < days.length; i++){
        var fee2 = getEventEntryfeeOfDay(days[i]);
        var fee3 = [];
        for (let j = 0; j < fee2.length; j++){
            let x = parseInt(fee2[j]["entryfee"]);
            if (!isNaN(x))
            fee3.push(x);
        }

        var sum, avg;
        if (fee3.length) {
            sum = fee3.reduce(function (a, b) { return a + b; });
            avg = sum / fee3.length;
        }

        arr.push({
            "date": days[i],
            "avgfee": avg.toFixed(0)
        })
    }

    return arr;
}

function drawCanvas(){
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
    var canvas = document.getElementById('canvas');
    var slider = document.getElementsByClassName('canvas_slider_viewOn')[0];
    var ctx = canvas.getContext('2d');
    var size = 600;
    canvas.style.width = size + "px";
    canvas.style.height = size/8 + "px";

// Set actual size in memory (scaled to account for extra pixel density).
    var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    canvas.width = size * scale;
    canvas.height = size/8 * scale;

// Normalize coordinate system to use css pixels.
    ctx.scale(scale, scale);

    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth=1;

    var cdata = getAverageEntryFeePerDay();
    var faktor = 2;
    for(let i = 0; i < cdata.length; i++){
        for (let j = 1; j <= 365; j++){
            var datum = new Date(cdata[i]["date"]);
            if(j == getDayOfYear(datum)){
                ctx.lineTo(j*faktor-(faktor*10), size/8-cdata[i]["avgfee"]);
                ctx.stroke();
            }
        }
    }

    canvas.onmousemove = function (e) {
        var r = canvas.getBoundingClientRect(),
            x = (e.clientX - (r.left)+10);
        var day = parseInt(x/faktor);
        slider.style.cssText = "display: inline; width: 2px; height: 80px; left: " + (x) + "px;";
        if (day !== 0)
            var date = dateFromDay(2018, day);
        var events = getEventEntryfeeOfDay(date);
        let txt = "";
        if (events.length !=0)
            for (let i = 0; i < events.length; i++) {
                let j = events[i]["index"];
                txt += "<strong>" + data.datenbank.event[j].veranstaltung.name + "</strong><ul><li>"
                    + data.datenbank.event[j].location.gaststaette + "</li><li>"
                    + "Eintritt " + data.datenbank.event[j].veranstaltung.eintritt + "Euro</li><li>"
                    + "Teilnehmende: " + data.datenbank.event[j].veranstaltung.teilnehmerzahl.teilgenommen + "</li></ul>";
            }
        var details = document.getElementById("details");
        details.innerHTML = txt;
        slider.onclick = function () {
            if (day !== 0)
                location.href = '#' + day;
        }; //öffnet link.
    };
}


document.addEventListener("DOMContentLoaded", function () {
    drawCanvas();
});

function dateFromDay(year, day){
    var date = new Date(year, 0); // initialize a date in `year-01-01`
    return new Date(date.setDate(day)).toISOString().slice(0,10); // add the number of days
} // Quelle: https://stackoverflow.com/questions/4048688/how-can-i-convert-day-of-year-to-date-in-javascript

function getDayOfYear(date){
    var now = date;
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
}

function getEventEntryfeeOfDay(date) {
    var result = [];
    for (let i = 0; i < data.datenbank.event.length; i++){
        if (date == data.datenbank.event[i].veranstaltung.daten.datum){
            result.push({
                "index" : i,
                "name" : data.datenbank.event[i].veranstaltung.name,
                "entryfee": data.datenbank.event[i].veranstaltung.eintritt
            });
        }
    }
    return result;

}

function printEvent(index) {
    var details = document.getElementById("details");

    var name = data.datenbank.event[index].veranstaltung.name;
    var location = data.datenbank.event[index].location.gaststaette;
    var datum = data.datenbank.event[index].veranstaltung.daten.datum;
    var uhrzeit = data.datenbank.event[index].veranstaltung.daten.uhrzeit;
    var gastgeber = data.datenbank.event[index].veranstaltung.gastgeber;
    var teilnehmerzahl_tg= parseInt(data.datenbank.event[index].veranstaltung.teilnehmerzahl.teilgenommen);
    var teilnehmerzahl_in= parseInt(data.datenbank.event[index].veranstaltung.teilnehmerzahl.interessiert);
    var eintritt = data.datenbank.event[index].veranstaltung.eintritt;
    details.innerText = "Name: " + name +
        "\nOrt: " + location +
        "\nVeranstalter: " + gastgeber +
        "\n " +
        "\nDatum: " + datum + " um " + uhrzeit + " Uhr" +
        "\nTeilgenommen: " + teilnehmerzahl_tg +
        "\nInteressiert: " + teilnehmerzahl_in +
        "\n " +
        "\nEintritt: " + eintritt +" Euro" +
        "\n ";

}