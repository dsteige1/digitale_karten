let dateBox = document.getElementById("dateBoxPrice");

function drawSomething() {
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
    for (let i = 0; i < data.datenbank.event.length; i++) {
        arr.push({
            "index": i,
            "entryfee": parseInt(data.datenbank.event[i].veranstaltung.eintritt),
            "date": data.datenbank.event[i].veranstaltung.daten.datum
        });
    }

    arr = arr.sort(function (a, b) {
        return (a["date"] > b["date"]) ? 1 : ((a["date"] < b["date"]) ? -1 : 0);
    });

    return arr;
}

function getAverageEntryFeeOfDaysArray() {
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

    for (let i = 0; i < days.length; i++) {
        var fee2 = getEventEntryfeeOfDay(days[i]);
        var fee3 = [];
        for (let j = 0; j < fee2.length; j++) {
            let x = parseInt(fee2[j]["entryfee"]);
            if (!isNaN(x))
                fee3.push(x);
        }

        var sum, avg;
        if (fee3.length) {
            sum = fee3.reduce(function (a, b) {
                return a + b;
            });
            avg = sum / fee3.length;
        }

        arr.push({
            "date": days[i],
            "avgfee": avg.toFixed(0)
        })
    }

    return arr;
}

function getAverageEntryFeeOfDay(day) {
    var cdata = getAverageEntryFeeOfDaysArray();
    for (let i = 0; i < cdata.length; i++) {
        if (cdata[i]["date"] == day) {
            return cdata[i]["avgfee"];
        }
    }
}

function drawCanvas() {
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
    var canvas = document.getElementById('canvas');
    var slider = document.getElementsByClassName('canvas_slider_viewOn')[0];
    var ctx = canvas.getContext('2d');
    var size = 600;
    canvas.style.width = size + "px";
    canvas.style.height = size / 14 + "px";

    // Set actual size in memory (scaled to account for extra pixel density).
    var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    canvas.width = size * scale;
    canvas.height = size / 14 * scale;

    // Normalize coordinate system to use css pixels.
    ctx.scale(scale, scale);

    var daypx = size/365;
    var month_color= "#f3f3f3"; //Farbe des Monats
    ctx.strokeStyle = "#949494"; //Farbe der Rahmen

    //Januar
    ctx.fillStyle = "#dcdfe5";
    ctx.fillRect(0, 0, daypx*31, 69);
    ctx.strokeRect(0, -1, daypx*31, 69);
    ctx.fillStyle = month_color;
    ctx.font = "50px Arial";
    ctx.fillText("1", 10, 40);
    //Februar
    ctx.fillStyle = "#c5c8cd";
    ctx.fillRect(daypx*31, 0, daypx*28, 69);
    ctx.strokeRect(daypx*31, -1, daypx*28, 69);
    ctx.fillStyle = month_color;
    ctx.font = "50px Arial";
    ctx.fillText("2", 60, 40);
    //März
    ctx.fillStyle = "#dcdfe5";
    ctx.fillRect(daypx*59, 0, daypx*31, 69);
    ctx.strokeRect(daypx*59, -1, daypx*31, 69);
    ctx.fillStyle = month_color;
    ctx.font = "50px Arial";
    ctx.fillText("3", 110, 40);
    //April
    ctx.fillStyle = "#c5c8cd";
    ctx.fillRect(daypx*90, 0, daypx*30, 69);
    ctx.strokeRect(daypx*90, -1, daypx*30, 69);
    ctx.fillStyle = month_color;
    ctx.font = "50px Arial";
    ctx.fillText("4", 160, 40);
    //Mai
    ctx.fillStyle = "#dcdfe5";
    ctx.fillRect(daypx*120, 0, daypx*31, 69);
    ctx.strokeRect(daypx*120, -1, daypx*31, 69);
    ctx.fillStyle = month_color;
    ctx.font = "50px Arial";
    ctx.fillText("5", 210, 40);
    //Juni
    ctx.fillStyle = "#c5c8cd";
    ctx.fillRect(daypx*151, 0, daypx*30, 69);
    ctx.strokeRect(daypx*151, -1, daypx*30, 69);
    ctx.fillStyle = month_color;
    ctx.font = "50px Arial";
    ctx.fillText("6", 260, 40);
    //Juli
    ctx.fillStyle = "#dcdfe5";
    ctx.fillRect(daypx*181, 0, daypx*31, 69);
    ctx.strokeRect(daypx*181, -1, daypx*31, 69);
    ctx.fillStyle = month_color;
    ctx.font = "50px Arial";
    ctx.fillText("7", 310, 40);
    //August
    ctx.fillStyle = "#c5c8cd";
    ctx.fillRect(daypx*212, 0, daypx*31, 69);
    ctx.strokeRect(daypx*212, -1, daypx*31, 69);
    ctx.fillStyle = month_color;
    ctx.font = "50px Arial";
    ctx.fillText("8", 360, 40);
    //September
    ctx.fillStyle = "#dcdfe5";
    ctx.fillRect(daypx*243, 0, daypx*30, 69);
    ctx.strokeRect(daypx*243, -1, daypx*30, 69);
    ctx.fillStyle = month_color;
    ctx.font = "50px Arial";
    ctx.fillText("9", 410, 40);
    //Oktober
    ctx.fillStyle = "#c5c8cd";
    ctx.fillRect(daypx*273, 0, daypx*31, 69);
    ctx.strokeRect(daypx*273, -1, daypx*31, 69);
    ctx.fillStyle = month_color;
    ctx.font = "50px Arial";
    ctx.fillText("10", 445, 40);
    //November
    ctx.fillStyle = "#dcdfe5";
    ctx.fillRect(daypx*304, 0, daypx*30, 69);
    ctx.strokeRect(daypx*304, -1, daypx*30, 69);
    ctx.fillStyle = month_color;
    ctx.font = "50px Arial";
    ctx.fillText("11", 500, 40);
    //Dezember
    ctx.fillStyle = "#c5c8cd";
    ctx.fillRect(daypx*334, 0, daypx*31, 69);
    ctx.strokeRect(daypx*334, -1, daypx*31, 69);
    ctx.fillStyle = month_color;
    ctx.font = "50px Arial";
    ctx.fillText("12", 545, 40);

    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    var cdata = getAverageEntryFeeOfDaysArray();
    var faktor = 1.68;
    for (let i = 0; i < cdata.length; i++) {
        for (let j = 1; j <= 365; j++) {
            var datum = new Date(cdata[i]["date"]);
            if (j == getDayOfYear(datum)) {
                var y = parseInt(cdata[i]["avgfee"]);
                ctx.lineTo(j * faktor - (faktor * 5), size / 14 - y -5);
                ctx.stroke();
            }
        }
    }

    let txt = "";
    canvas.onmousemove = function (e) {
        var r = canvas.getBoundingClientRect(),
            x = (e.clientX - (r.left) + 10);
        var day = parseInt(x / faktor);
        slider.style.cssText = "display: inline; width: 2px; height: 69px; left: " + (x) + "px;";
        if (day !== 0)
            var date = dateFromDay(2018, day);
        var date_m = moment(date);
        var events = getEventEntryfeeOfDay(date_m.format('YYYY-MM-DD'));

        clearGraphics();
        let point = getEventsOfDay(day);
        for (let i = 0; i < point.length; i++) {
            drawPoint(point[i].location.long,
                point[i].location.lat,
                point[i].veranstaltung.name,
                point[i].veranstaltung.teilnehmerzahl.teilgenommen);
            //sliderDate = new Date(point[i].veranstaltung.daten.datum);
        }

        slider.onclick = function () {
            txt = "";
            if (day !== 0)

                if (events.length != 0) {
                    txt += "<p>Der durchschnittliche Eintrittspreis beträgt: <strong>" + getAverageEntryFeeOfDay(date_m.format('YYYY-MM-DD')) + "€</strong></p>";
                    for (let i = 0; i < events.length; i++) {
                        let j = events[i]["index"];
                        txt += "<strong>" + data.datenbank.event[j].veranstaltung.name + "</strong><ul><li>"
                            + data.datenbank.event[j].location.gaststaette + "</li><li>"
                            + "Eintritt " + data.datenbank.event[j].veranstaltung.eintritt + "€</li><li>"
                            + "Teilnehmende: " + data.datenbank.event[j].veranstaltung.teilnehmerzahl.teilgenommen + "</li></ul>";
                    }
                } else {
                    txt = "Keine Veranstaltungen!";
                }

            var details = document.getElementById("infobox");
            details.innerHTML = txt;
        }; //öffnet link.
    };
}


document.addEventListener("DOMContentLoaded", function () {
    drawCanvas();
});

function getDayOfYear(date) {
    var now = date;
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
}

function getEventEntryfeeOfDay(date) {
    var result = [];
    for (let i = 0; i < data.datenbank.event.length; i++) {
        if (date == data.datenbank.event[i].veranstaltung.daten.datum) {
            result.push({
                "index": i,
                "name": data.datenbank.event[i].veranstaltung.name,
                "entryfee": data.datenbank.event[i].veranstaltung.eintritt
            });
        }
    }
    return result;

}

function getEventsOfDay(day) {

    var date = dateFromDay(2018, day);
    var result = [];
    for (let i = 0; i < data.datenbank.event.length; i++) {
        var date2 = new Date(data.datenbank.event[i].veranstaltung.daten.datum);
        if (date.toDateString() === date2.toDateString()) {
            result.push(data.datenbank.event[i]);
        }
    }
    return result;
}
