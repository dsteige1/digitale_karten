
//Funktionen um die einzelnen Werte auszugeben

function getNameOfHosts() {
    var result = [];
    loop1: for (var i = 0; i < data.datenbank.event.length; i++) {
        var name = data.datenbank.event[i].veranstaltung.gastgeber;
        for (var i2 = 0; i2 < result.length; i2++) {
            if (result[i2] === name) {
                continue loop1;
            }
        }
        result.push(name);
    }
    return result;
}

function getNameOfClubs() {
    var result = [];
    loop1: for (var i = 0; i < data.datenbank.event.length; i++) {
        var name = data.datenbank.event[i].location.gaststaette;
        for (var i2 = 0; i2 < result.length; i2++) {
            if (result[i2] === name) {
                continue loop1;
            }
        }
        result.push(name);
    }
    return result;
}

function getAverageEntryFee() {
    var arr = [];
    for (let i = 0; i < data.datenbank.event.length; i++) {
        var eintritt = parseInt(data.datenbank.event[i].veranstaltung.eintritt);

        if (eintritt !== 0 && !isNaN(eintritt)) {
            arr.push(eintritt);
        }
    }
    var sum, avg;
    if (arr.length) {
        sum = arr.reduce(function (a, b) { return a + b; });
        avg = sum / arr.length;
    }
    return avg.toFixed(2);
}

function getMaxVisitedEvent() {
    var arr = [];
    for (let i = 0; i < data.datenbank.event.length; i++) {
        var visitors = parseInt(data.datenbank.event[i].veranstaltung.teilnehmerzahl.teilgenommen) + parseInt(data.datenbank.event[i].veranstaltung.teilnehmerzahl.interessiert);
        var id = parseInt(data.datenbank.event[i].id);
        arr.push({ "index": i, "id": id, "visitors": visitors })
    }

    arr = arr.sort(function (a, b) {
        return (a["visitors"] > b["visitors"]) ? 1 : ((a["visitors"] < b["visitors"]) ? -1 : 0);
    });

    var eventIndex = arr[arr.length - 1]["index"];
    //var eventName  = data.datenbank.event[eventIndex].veranstaltung.name;

    return eventIndex;
}

function addDDList(){
    let list = getNameOfClubs();
    let dd = document.getElementById("dropdown");
    let dd_data = document.getElementById("dd_data");
    let dd_date = document.getElementById("dd_date");
    let dd_event = document.getElementById("dd_event");
    let details = document.getElementById("details");
    var index_value = -1;

    for (let i=0; i < list.length; i++){
        let opt = document.createElement("option");
        opt.value = i+1;
        opt.innerHTML = list[i];
        dd_data.add(opt);
    }

    dd_data.onchange = function () {
        if(dd_date.style.display = 'none'){
            dd_date.style.display = ''
        }
        removeOptions(dd_date);
        let dddata = getEventsOfClub(dd_data[dd_data.value].text);
        for (let i = 0; i < dddata.length; i++){
            let opt = document.createElement("option");
            opt.value = i+1;
            opt.innerHTML=changeDateFormat(dddata[i]);
            dd_date.add(opt);
        }
    }

    dd_date.onchange = function () {
        if(dd_event.style.display = 'none'){
            dd_event.style.display = ''
        }
        removeOptions(dd_event);
        let dddata = getEventsOfDateString(reChangeDateFormat(dd_date[dd_date.value].text));
        for (let i = 0; i < dddata.length; i++){
            let opt = document.createElement("option");
            opt.value = dddata[i]["index"];
            opt.innerHTML=dddata[i]["name"];
            dd_event.add(opt);
        }
    }

    dd_event.onchange = function () {
        var details = document.getElementById("dd_details");

        var name = data.datenbank.event[dd_event.value].veranstaltung.name;
        var location = data.datenbank.event[dd_event.value].location.gaststaette;
        var datum = changeDateFormat(data.datenbank.event[dd_event.value].veranstaltung.daten.datum);
        var uhrzeit = data.datenbank.event[dd_event.value].veranstaltung.daten.uhrzeit;
        var gastgeber = data.datenbank.event[dd_event.value].veranstaltung.gastgeber;
        var teilnehmerzahl_tg= parseInt(data.datenbank.event[dd_event.value].veranstaltung.teilnehmerzahl.teilgenommen);
        var teilnehmerzahl_in= parseInt(data.datenbank.event[dd_event.value].veranstaltung.teilnehmerzahl.interessiert);
        var eintritt = data.datenbank.event[dd_event.value].veranstaltung.eintritt;
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
}

function getEventsOfClub (club) {

    var result = [];
    for (let i = 0; i < data.datenbank.event.length; i++){
        if (club == data.datenbank.event[i].location.gaststaette){
            result.push(data.datenbank.event[i].veranstaltung.daten.datum);
        }
    }
    return result;
}

function getEventsOfDateString (date) {

    var result = [];
    for (let i = 0; i < data.datenbank.event.length; i++){
        if (date == data.datenbank.event[i].veranstaltung.daten.datum){
            result.push({
                "index" : i,
                "name" : data.datenbank.event[i].veranstaltung.name
            });
        }
    }
    return result;
}

function removeOptions(selectbox)
{
    var i;
    for(i = selectbox.options.length - 1 ; i >= 1 ; i--)
    {
        selectbox.remove(i);
    }
}

function changeDateFormat (date){
    var year = date.slice(0,4);
    var month = date.slice(5,7);
    var day = date.slice(8,10);
    return day + "." + month + "." + year;
}

function reChangeDateFormat(date){
    var day = date.slice(0,2);
    var month = date.slice(3,5);
    var year = date.slice(6,10);
    return year + "-" + month + "-" + day;
}

document.addEventListener("DOMContentLoaded", function () {
    var overview = document.getElementById("overview");
    overview.innerHTML = "Die Datenbank hat insgesamt <strong>" + (data.datenbank.event.length - 1) + "</strong> Einträge von <strong>" + getNameOfClubs().length + "</strong> Clubs." +
        "<br>Der durchschnittliche Eintrittspreis beträgt <strong>" + getAverageEntryFee() + "</strong>€." +
        "<p>Das meistbesuchte Event ist <strong>" + data.datenbank.event[getMaxVisitedEvent()].veranstaltung.name + "</strong> im <strong>" + data.datenbank.event[getMaxVisitedEvent()].location.gaststaette + "</strong></p>";
        addDDList();
});