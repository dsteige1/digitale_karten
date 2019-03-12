var data = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'data/datenbank.json',
        'dataType': "json",
        'success': function (jsondata) {
            data = jsondata;
        }
    });
    return data;
})();