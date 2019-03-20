let colorSlider = document.getElementById("colorRange");
let dateBox = document.getElementById("dateColor");
let radios = document.getElementById("radioCheck");
var priceRadio = document.getElementById("radio1");
var paxRadio = document.getElementById("radio2");
let valueCheck = true;
let daysEvents = [];
let txt = "";

getActualEvents();
colorSlider.max = daysEvents.length - 1;

colorSlider.addEventListener("input", function () {

    clearGraphics();
    txt = "";
    let day = colorSlider.value;

    if (paxRadio.checked) {
        for (let i = 0; i < daysEvents[day].length; i++) {
            drawPoint(daysEvents[day][i].location.long,
                daysEvents[day][i].location.lat,
                daysEvents[day][i].veranstaltung.name,
                daysEvents[day][i].veranstaltung.teilnehmerzahl.teilgenommen);
        }
    }

    else if (priceRadio.checked){
        for (let i = 0; i < daysEvents[day].length; i++) {
            drawPoint(daysEvents[day][i].location.long,
                daysEvents[day][i].location.lat,
                daysEvents[day][i].veranstaltung.name,
                daysEvents[day][i].veranstaltung.eintritt);
        }
    }

    let date = new Date(daysEvents[day][0].veranstaltung.daten.datum);
    let tag = date.toLocaleDateString();
    dateBox.innerHTML = tag;
});

radios.addEventListener("change", function () {
    if (priceRadio.checked) {
        console.log(priceRadio.value);
    }
    else if (paxRadio.checked) {
        console.log(paxRadio.value);
    }
})

function getActualEvents() {
    for (let i = 1; i <= 365; i++) {
        if (getEventsOfDay(i).length != 0)
            daysEvents.push(getEventsOfDay(i));
    }
    max = daysEvents.length;
}