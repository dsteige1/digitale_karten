//var require;
let Graphic;
let view;
let map;
let graphic;
let MarkerLayer;

require([
        "esri/Map",
        "esri/views/SceneView",
        "esri/widgets/BasemapToggle",
        "esri/widgets/BasemapGallery",
        "esri/layers/TileLayer",
        "esri/layers/GraphicsLayer",
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

        var point = getClubs();

        MarkerLayer = new GraphicsLayer({
            //graphics: [graphic]
        })

        map.add(MarkerLayer);           //Add Layer to Map


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


        var basemapToggle = new BasemapToggle({
            view: view,
            secondMap: "satellite"
        });


        var basemapGallery = new BasemapGallery({
            view: view,
            source: {
                portal: {
                    url: "http://www.arcgis.com",
                    useVectorBasemaps: true  // Load vector tile basemaps
                }
            }
        });

        var LayerToggle = document.getElementById("MarkerLayerBox");

        LayerToggle.addEventListener("change", function () {
            // When the checkbox is checked (true), set the layer's visibility to true
            MarkerLayer.visible = LayerToggle.checked;
        });

        // Add to the view
        //view.ui.add(basemapToggle, "bottom-right");

        // Add to the view. BUT: If enabled throws error:
        //"TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'."
        //view.ui.add(basemapGallery, "top-right");

    });


//Function to add Markers to the Layer

function drawPoint(x,y,n)
{
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

    graphic = new Graphic({
        geometry: p,
        symbol: s,
        popupTemplate:
        popupTemplate
    })

    MarkerLayer.graphics.add(graphic);      //Adds graphics (markers) to Layer
    //MarkerLayer.add(graphic);

    //view.graphics.add(graphic);           //Would add graphics directly to the view (we don't want that)

    return;
}

//setTimeout(clearGraphics,5000);             //Just for demonstration

function clearGraphics()
{
    console.log("Timeout.");
    MarkerLayer.removeAll();            //Removes all graphics from Layer
    console.log("MarkerLayer cleared.");
}

function getClubs(){
    var result = [];
    loop1: for (var i = 0; i < data.datenbank.event.length; i++) {
        var name = data.datenbank.event[i].location.gaststaette;
        var lat  = data.datenbank.event[i].location.lat;
        var long = data.datenbank.event[i].location.long;
        for (var i2 = 0; i2 < result.length; i2++) {
            if (result[i2] == name) {
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