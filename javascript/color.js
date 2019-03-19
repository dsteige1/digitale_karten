let colorSlider     = document.getElementById("colorRange");
let daysEvents      = [];

getActualEvents();

colorSlider.addEventListener("change", function(){

    clearGraphics();
    let day = colorSlider.value;
    console.log(day);
    
    for (let i = 0; i < daysEvents[day].length; i++) {
        drawPoint(daysEvents[day][i].location.long,
            daysEvents[day][i].location.lat,
            daysEvents[day][i].veranstaltung.name,
            daysEvents[day][i].veranstaltung.teilnehmerzahl.teilgenommen);
    }
});

function getActualEvents() {
    for (let i = 1; i <= 365; i++) {
        if (getEventsOfDay(i).length != 0)
            daysEvents.push(getEventsOfDay(i));     
    }
    max = daysEvents.length;
}