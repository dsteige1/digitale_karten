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
    function (
        Map,
        SceneView,
        GraphicsLayer,
        //Graphic,      //disable for outer drawPoint()
        GraphicClass, //enable for outer drawPoint()
        Point,
        //SimpleMarkerSymbol,
    ) {
        Graphic = GraphicClass;    //enable for outer drawPoint()

        map = new Map({
            basemap: "dark-gray",
            //layers: [housingLayer]
        });

        view = new SceneView({
            container: "viewDiv",
            center: [6.916664, 50.950237],
            zoom: 15,
            map: map
        });

        /*
        view.when(function () {
            view.goTo({
                center: [6.916664, 50.950237],
                zoom: 15,
                tilt: 0
            })
        });
        */

        //var point = getClubs();

        MarkerLayer = new GraphicsLayer({
            //graphics: [graphic]
        });

        map.add(MarkerLayer);           //Add Layer to Map

        var LayerToggle = document.getElementById("MarkerLayerBox");

        LayerToggle.addEventListener("change", function () {
            // When the checkbox is checked (true), set the layer's visibility to true
            MarkerLayer.visible = LayerToggle.checked;
        });
    });


//Function to add Markers to the Layer

function drawPoint(x, y, n, w) {
    let p = {
        type: "point",
        longitude: x,
        latitude: y,
    };

    let dataColor;

    if (paxRadio.checked) {
        switch (true) {
            case (w >= 0 && w <= 100):
                dataColor = [243, 216, 216];
                break;
            case (w > 100 && w <= 200):
                dataColor = [225, 157, 157];
                break;
            case (w > 200 && w <= 500):
                dataColor = [207, 99, 99];
                break;
            case (w > 500 && w <= 1000):
                dataColor = [176, 54, 54];
                break;
            case (w > 1000 && w <= 5000):
                dataColor = [117, 36, 36];
                break;
            case ( w > 5000):
                dataColor = [78, 24, 24];
                break;
        }
    }

    if (priceRadio.checked){
        switch (true) {

            case (w == 0):
                dataColor = [255, 255, 255];
                break;
            case (w > 0 && w <= 5):
                dataColor = [217, 242, 229];
                break;
            case (w > 5 && w <= 10):
                dataColor = [102, 204, 153];
                break;
            case (w > 10 && w <= 15):
                dataColor = [42, 137, 86];
                break;
            case (w > 15 && w <= 20):
                dataColor = [24, 78, 48];
                break;
            case (w > 20):
                dataColor = [12, 39, 24];
                break;
        }
    }

    let s = {
        type: "simple-marker",
        color: dataColor,
        outline: {
            color: [0, 0, 0],
            width: 0.5
        },
        size: 20
    };

    var popupTemplate = {
        title: n,
        //content: "I am a <strong>{Type}</strong> in the city of <strong>{City}</strong>."
    };

    graphic = new Graphic({
        geometry: p,
        symbol: s,
        popupTemplate:
            popupTemplate
    });

    MarkerLayer.graphics.add(graphic);      //Adds graphics (markers) to Layer
    //MarkerLayer.add(graphic);

    //view.graphics.add(graphic);           //Would add graphics directly to the view (we don't want that)
}

function clearGraphics() {

    MarkerLayer.removeAll();                //Removes all graphics from Layer
    //console.log("MarkerLayer cleared.");
}

function getClubs() {
    var result = [];
    loop1: for (var i = 0; i < data.datenbank.event.length; i++) {
        var name = data.datenbank.event[i].location.gaststaette;
        var lat = data.datenbank.event[i].location.lat;
        var long = data.datenbank.event[i].location.long;
        for (var i2 = 0; i2 < result.length; i2++) {
            if (result[i2] === name) {
                continue loop1;
            }
        }
        result.push(name, long, lat);
    }

    var point = [];
    for (let i = 0; i < result.length; i++) {
        var arr = {
            "name": result[i],
            "longitude": result[i + 1],
            "latitude": result[i + 2]
        };
        point.push(arr);
        i = i + 2;
    }
    return point;
}

function getDayOfYear(date) {
    var now = date;
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
} //Quelle: https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366

function dateFromDay(year, day) {
    var date = new Date(year, 0); // initialize a date in `year-01-01`
    return new Date(date.setDate(day)); // add the number of days
} // Quelle: https://stackoverflow.com/questions/4048688/how-can-i-convert-day-of-year-to-date-in-javascript

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