let colorSlider = document.getElementById("colorRange");
let dateBox     = document.getElementById("dateColor");
let radios      = document.getElementById("radioCheck");
var priceRadio  = document.getElementById("radio1");
var paxRadio    = document.getElementById("radio2");
let infoBox     = document.getElementById("infoboxColor");
let legendPax   = document.getElementById("legendeColor1");
let legendPrice = document.getElementById("legendeColor2");
let valueCheck = true;
let daysEvents = [];
let txt = "";

getActualEvents();
colorSlider.max = daysEvents.length - 1;    //Range of Slider dependant on amount of days of database
dateBox.style.display = 'none';
legendPrice.style.display = 'none';

colorSlider.addEventListener("input", function () {

    clearGraphics();
    txt = "";
    let day = colorSlider.value;
    dateBox.style.display = 'inline';


    if (paxRadio.checked) {
        for (let i = 0; i < daysEvents[day].length; i++) {
            drawPoint(daysEvents[day][i].location.long,
                daysEvents[day][i].location.lat,
                daysEvents[day][i].veranstaltung.name,
                daysEvents[day][i].veranstaltung.teilnehmerzahl.teilgenommen);

            txt += "<strong>" + daysEvents[day][i].veranstaltung.name + "</strong><ul><li>"
                + daysEvents[day][i].location.gaststaette + "</li><li>"
                + "Teilnehmende: " + daysEvents[day][i].veranstaltung.teilnehmerzahl.teilgenommen + "</li></ul>";
        }
    }

    else if (priceRadio.checked) {
        for (let i = 0; i < daysEvents[day].length; i++) {
            drawPoint(daysEvents[day][i].location.long,
                daysEvents[day][i].location.lat,
                daysEvents[day][i].veranstaltung.name,
                daysEvents[day][i].veranstaltung.eintritt);

            txt += "<strong>" + daysEvents[day][i].veranstaltung.name + "</strong><ul><li>"
                + daysEvents[day][i].location.gaststaette + "</li><li>"
                + "Eintritt: " + daysEvents[day][i].veranstaltung.eintritt + "&#8364;</li></ul>";
        }
    }

    let date = new Date(daysEvents[day][0].veranstaltung.daten.datum);
    let tag = date.toLocaleDateString();
    dateBox.innerHTML = tag;
    infoBox.innerHTML = txt;
});

radios.addEventListener("change", function () {
    if (priceRadio.checked) {
        legendPax.style.display = 'none';
        legendPrice.style.display = 'inline';
    }
    else if (paxRadio.checked) {
        legendPrice.style.display = 'none';
        legendPax.style.display = 'inline';
    }
})

function getActualEvents() {
    for (let i = 1; i <= 365; i++) {
        if (getEventsOfDay(i).length != 0)
            daysEvents.push(getEventsOfDay(i));
    }
    max = daysEvents.length;
}