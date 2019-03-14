let AnimationCheck  = true;
let AnimatorToggle  = document.getElementById("animatorBox");
let infoBox         = document.getElementById('infobox');
let fader           = document.getElementById("myRange");
let speedOut        = document.getElementById("speedOutput");
let max             = 0;
let count           = 0;
let events          = [];
let txt             = "";
let animSpeed       = 1000;

setTimeout(Animator, 3000);
getActualEvents();
speedOut.innerText = animSpeed / 1000;

AnimatorToggle.addEventListener("change", function ()
{
    if (AnimationCheck == true)
    {
        AnimationCheck=false;
    }
    else if (AnimationCheck == false)
    {
        AnimationCheck = true;
        Animator();
    }
});

fader.addEventListener("change", function ()
{
    animSpeed = fader.value;
    speedOut.innerText = animSpeed / 1000;
})

function Animator()
{
    if (AnimationCheck==true)
    {
        if (count != 0)
            clearGraphics();

        txt = "";

        for (let i=0; i < events[count].length; i++)
        {
            drawPoint(events[count][i].location.long,
                events[count][i].location.lat,
                events[count][i].veranstaltung.name,
                events[count][i].veranstaltung.teilnehmerzahl.teilgenommen);

            txt += "<p>" + events[count][i].veranstaltung.name + " im <strong>"
                + events[count][i].location.gaststaette + "</strong><br>"
                + "Teilnehmende: " + events[count][i].veranstaltung.teilnehmerzahl.teilgenommen
                + "<br>Datum: " + events[count][i].veranstaltung.daten.datum + "</p>";

        }

        infoBox.innerHTML = txt;

        if(count <= max)
            count++
        else
            count = 0;

        setTimeout(Animator, animSpeed);
    }
    else return;
}

function getActualEvents()
{
    for(let i=1; i <= 365; i++)
    {
        if (getEventsOfDay(i).length != 0)
            events.push(getEventsOfDay(i));
    }
    max = events.length;
}