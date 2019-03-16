let events = getEventsOfDay(5);

function drawSomething() 
{
    for (let i = 0; i < events.length; i++) {
        drawPoint(events[i].location.long,
            events[i].location.lat,
            events[i].veranstaltung.name,
            events[i].veranstaltung.teilnehmerzahl.teilgenommen);
        console.log("drawing");
    };
}