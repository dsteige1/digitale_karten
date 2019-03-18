var data = (function () {
    $.ajax({
        'async': false,         //throws error:
        'global': false,
        'url': '../data/datenbank.json',
        'dataType': "json",
        'success': function (jsondata) {
            data = jsondata;
        }
    });
    console.log("Data loaded");
    return data;
})();