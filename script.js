//var require;
let Graphic;
let view;

require([
        "esri/Map",
        "esri/views/SceneView",
        "esri/widgets/BasemapToggle",
        "esri/widgets/BasemapGallery",
        "esri/layers/TileLayer",
        "esri/Graphic",
        "esri/geometry/Point",
        "esri/symbols/SimpleMarkerSymbol",
        "dojo/domReady!"
    ],
    function(
        Map,
        SceneView,
        TileLayer,
        BasemapToggle,
        BasemapGallery,
        //Graphic,      //disable for outer drawPoint()
        GraphicClass, //enable for outer drawPoint()
        Point,
        //SimpleMarkerSymbol,
    ) {
        Graphic = GraphicClass;    //enable for outer drawPoint()


        var map = new Map({
            basemap: "topo",
            //layers: [housingLayer]
        });

        view = new SceneView({
            container: "viewDiv",
            center: [6.916664, 50.950237],
            zoom: 15,
            map: map
        });

        //map.add(transportationLayer);

        var point = [
            {
                "name" : "Heinz Gaul",
                "longitude": 6.911848,
                "latitude": 50.949979
            },
            {
                "name" : "Club Bahnhof Ehrenfeld",
                "longitude": 6.916088,
                "latitude": 50.951840
            },
            {
                "name" : "Helios 37",
                "longitude": 6.913468,
                "latitude": 50.950294
            },
            {
                "name" : "Artheater",
                "longitude": 6.918748,
                "latitude": 50.953241
            }
        ]

        for (let i=0; i < point.length; i++){
            //console.log(point[i].longitude);
            drawPoint(point[i].longitude, point[i].latitude, point[i].name);
        }

        /*
        var point = new Point (
            {
                longitude: 6.916088,
                latitude: 50.951840
            }
        );

        var markerSymbol = new SimpleMarkerSymbol({
            color: [226, 119, 40],
            outline: {
                color: [255, 255, 255],
                width: 1
            }
        });

        var attributes = {
            Name: "Ich bin Heinz Gaul",
            Type: "Club",
            City: "Ehrenfeld"
        };

        var popupTemplate = {
            title: "{Name}",
            content: "I am a <strong>{Type}</strong> in the city of <strong>{City}</strong>."
        };

        var pointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
            attributes: attributes,
            popupTemplate: popupTemplate
        });

        view.graphics.add(pointGraphic);
        */

        //Basemaps

        var basemapGallery = new BasemapGallery({
            view: view,
            source: {
                portal: {
                    url: "http://www.arcgis.com",
                    useVectorBasemaps: true  // Load vector tile basemaps
                }
            }
        });

        var basemapToggle = new BasemapToggle({
            view: view,
            secondMap: "satellite"
        });

        view.ui.add(basemapToggle, "bottom-right"); // Add to the view
        view.ui.add(basemapGallery, "top-right"); // Add to the view#

    });

function drawPoint(x,y,n){

    let p = {
        type: "point",
        longitude   : x,
        latitude    : y,
    }

    let s = {
        type    : "simple-marker",
        color   : [255,0,0,0.5],
        outline: {
            color: [0, 255, 0],
            width: 1
        },
        size    : 10
    }

    var popupTemplate = {
        title: n,
        //content: "I am a <strong>{Type}</strong> in the city of <strong>{City}</strong>."
    };

    let graphic = new Graphic({geometry: p, symbol: s, popupTemplate: popupTemplate})

    view.graphics.add(graphic);

    return;
}