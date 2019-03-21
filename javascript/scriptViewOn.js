let Graphic;
let view;
let map;
let graphic;
let MarkerLayer;

require([
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/GraphicsLayer",
        "esri/Graphic",
        "esri/geometry/Point",
        "esri/symbols/SimpleMarkerSymbol",
        "dojo/domReady!"
    ],
    function(
        Map,
        SceneView,
        GraphicsLayer,
        GraphicClass, //enable for outer drawPoint()
        Point){

        Graphic = GraphicClass;    //enable for outer drawPoint()

        map = new Map({
            basemap: "dark-gray",
        });

        view = new SceneView({
            container: "viewDiv",
            center: [6.916664, 50.950237],
            zoom: 15,
            map: map
        });

        MarkerLayer = new GraphicsLayer();   //Create Layer
        map.add(MarkerLayer);               //Add Layer to Map

        var LayerToggle = document.getElementById("MarkerLayerBox");

        LayerToggle.addEventListener("change", function () {
            MarkerLayer.visible = LayerToggle.checked;
        });
    });


//Function to add Markers to the Layer

function drawPoint(x,y,n,w)
{
    let p = {
        type: "point",
        longitude   : x,
        latitude    : y,
    };

    let s = {
        type    : "simple-marker",
        color   : [255,0,0,0.5],
        outline: {
            color: [0, 255, 0],
            width: 1
        },
        size    : w/10              //Divided by 10, otherwhise marker would be too big.
    };

    var popupTemplate = {
        title: n,
    };

    graphic = new Graphic({
        geometry: p,
        symbol: s,
        popupTemplate:
        popupTemplate
    });

    MarkerLayer.graphics.add(graphic);      //Adds graphics (markers) to Layer
}

function clearGraphics() {

    MarkerLayer.removeAll();                //Removes all graphics from Layer
}

function getClubs(){
    var result = [];
    loop1: for (var i = 0; i < data.datenbank.event.length; i++) {
        var name = data.datenbank.event[i].location.gaststaette;
        var lat  = data.datenbank.event[i].location.lat;
        var long = data.datenbank.event[i].location.long;
        for (var i2 = 0; i2 < result.length; i2++) {
            if (result[i2] === name) {
                continue loop1;
            }
        }
        result.push(name, long, lat);
    }

    var point = [];
    for (let i = 0;i < result.length; i++){
        var arr = {
            "name" : result[i],
            "longitude": result[i+1],
            "latitude": result[i+2]
        };
        point.push(arr);
        i = i+2;
    }
    return point;
}

function getDayOfYear(date){
    var now = date;
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
} //Quelle: https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366

function dateFromDay(year, day){
    var date = new Date(year, 0); // initialize a date in `year-01-01`
    return new Date(date.setDate(day)); // add the number of days
} // Quelle: https://stackoverflow.com/questions/4048688/how-can-i-convert-day-of-year-to-date-in-javascript

function getEventsOfDay (day) {

    var date = dateFromDay(2018, day);
    var result = [];
    for (let i = 0; i < data.datenbank.event.length; i++){
        var date2 = new Date(data.datenbank.event[i].veranstaltung.daten.datum);
        if (date.toDateString() === date2.toDateString()){
            result.push(data.datenbank.event[i]);
        }
    }
    return result;
}