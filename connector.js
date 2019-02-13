var data;

$.ajax({
    url:        'data/datenbank.json',
    dataType:   'json',
    type:       'get',
    cache:      'true',
    success:    function(data){

        console.log('Data loaded');
        /*
        for (let i=2; i<=5; i++)
        {
            console.log(
                "Event: " +
                data.datenbank.event[i].veranstaltung.name + "\n" +
                "Datum: " +
                data.datenbank.event[i].veranstaltung.daten.datum + "\n" +
                "Location: " +
                data.datenbank.event[i].location.gaststaette + "\n" +
                "Latitude: " + 
                data.datenbank.event[i].location.lat + "\n" +
                "Longitude: " + 
                data.datenbank.event[i].location.long + "\n" +
                "Teilnehmende: " +
                data.datenbank.event[i].veranstaltung.teilnehmerzahl.teilgenommen + "\n"
            )
        }
        */
    }
})