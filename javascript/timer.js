let AnimationCheck = true;
let AnimatorToggle = document.getElementById("animatorBox");
let infoBox     = document.getElementById("infoboxTimer");
let button      = document.getElementById("animatorButton");
let fader       = document.getElementById("myRange");
let speedOut    = document.getElementById("speedOutput");
let dateBox     = document.getElementById("dateDisplay");
let animSpeed   = 1000;
let max     = 0;
let count   = 0;
let events  = [];
let txt     = "";
let txtDate = "";

dateBox.style.display = 'none';
infoBox.style.display = 'none';

setTimeout(function(){ 
    dateBox.style.display = 'inline';       //Macht InfoBox und
    infoBox.style.display = 'inline';       //Datum sichtbar
}, 3000);

setTimeout(Animator, 3000);
getActualEvents();
speedOut.innerText = animSpeed / 1000;

button.addEventListener("click", function () {
    if (AnimationCheck === true) {
        AnimationCheck = false;
        button.value = "Start Animation";
    }
    else if (AnimationCheck === false) {
        AnimationCheck = true;
        button.value = "Stop Animation";
        Animator();
    }
});

fader.addEventListener("change", function () {
    console.log("Animation speed changed from " + animSpeed);
    animSpeed = fader.value;
    console.log("to " + animSpeed + " msecs.");
    speedOut.innerText = animSpeed / 1000;
    
});

function Animator() {
    if (AnimationCheck == true) {
        if (count != 0)
            clearGraphics();

        txt     = "";
        txtDate = "";

        for (let i = 0; i < events[count].length; i++) {
            drawPoint(events[count][i].location.long,
                events[count][i].location.lat,
                events[count][i].veranstaltung.name,
                events[count][i].veranstaltung.teilnehmerzahl.teilgenommen);

            txt += "<strong><a onclick='centerView(" + i + ")'>" + events[count][i].veranstaltung.name + "</a></strong><ul><li>"
                + events[count][i].location.gaststaette + "</li><li>"
                + "Teilnehmende: " + events[count][i].veranstaltung.teilnehmerzahl.teilgenommen + "</li></ul>";
        }

        let date = new Date(events[count][0].veranstaltung.daten.datum);
        let tag = date.toLocaleDateString();

        infoBox.innerHTML   = txt;
        dateBox.innerHTML   = tag;

        if (count < max-1)
            count++;
        else
            count = 0;

        setTimeout(Animator, animSpeed);
    }
}

function getActualEvents() {
    for (let i = 1; i <= 365; i++) {
        if (getEventsOfDay(i).length != 0)
            events.push(getEventsOfDay(i));     //getEventsOfDay() gibt Array raus
    }                                           //Wird in Array gepusht -> zweidimensional -> Matrix
    max = events.length;
}

function centerView(i){
    //view.centerAt(new Point(6.54488, 50.943388));
    //view.center[events[count][i].location.long, events[count][i].location.long];
    view.zoom = 16;     
    console.log("Clicked");
}