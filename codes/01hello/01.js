var map;
window.onload = function () {
    map = zcMap.fnInitTdt("divMap", [34.7, 97.8]);

    var t = [10, 20, 9, 10, 25, 17, 1];
    var x = [97.8, 107.44, 108.23, 114.87, 107.23, 109.21, 111.2];
    var y = [34.7, 32.32, 37.155, 36.7, 32.32, 33.22, 33];
    var model = "spherical";
    var sigma2 = 0.1, alpha = 100;
    var variogram = kriging.train(t, x, y, model, sigma2, alpha);
    var extent = [90, 30, 138, 52];
    var cellWidth = 0.05;
    var pointGrid = turf.pointGrid(extent, cellWidth, {units: 'degrees'});
    var value = kriging.predict(-116.400146484375, 39.89547729492188, variogram);
    for (var i = 0; i < pointGrid.features.length; i++) {
        pointGrid.features[i].properties.temperature = kriging.predict(
            pointGrid.features[i].geometry.coordinates[0],
            pointGrid.features[i].geometry.coordinates[1],
            variogram);
    }
    var breaks = [1, 3, 5, 9, 13, 15, 18, 20, 25];

//var isolines = turf.isolines(pointGrid, breaks, {zProperty: 'temperature'});
//console.debug(isolines);
//
    var isobands = turf.isobands(pointGrid, breaks, {zProperty: 'temperature'});

    var symbol;
    var ploylineSymbol1 = {
        fillColor: "#FFFF00",
        color: "#000000"
    };
    var ploylineSymbol2 = {
        fillColor: "#FFFF00",
        color: "#000000"
    };
    var ploylineSymbol3 = {
        fillColor: "#00FF00",
        color: "#000000"
    };

    var ploylineSymbol4 = {
        fillColor: "#00FFCD",
        color: "#000000"
    };
    var ploylineSymbol5 = {
        fillColor: "#0000FF",
        color: "#000000"
    };

    var ploylineSymbol6 = {
        fillColor: "#FF00FF",
        color: "#000000"
    };
    var ploylineSymbol7 = {
        fillColor: "#808080",
        color: "#000000"
    };

    var featureLayer = L.layerGroup().addTo(map);
    for (var i = 0; i < isobands.features.length; i++) {
        if (isobands.features[i].properties.temperature == "20-25") {
            symbol = ploylineSymbol1;
        }
        if (isobands.features[i].properties.temperature == "18-20") {
            symbol = ploylineSymbol2;
        }
        if (isobands.features[i].properties.temperature == "15-18") {
            symbol = ploylineSymbol3;
        }
        if (isobands.features[i].properties.temperature == "13-15") {
            symbol = ploylineSymbol4;
        }
        if (isobands.features[i].properties.temperature == "9-13") {
            symbol = ploylineSymbol5;
        }
        if (isobands.features[i].properties.temperature == "5-9") {
            symbol = ploylineSymbol6;
        }
        if (isobands.features[i].properties.temperature == "3-5") {
            symbol = ploylineSymbol7;
        }
        if (isobands.features[i].properties.temperature == "1-3") {
            symbol = ploylineSymbol7;
        }


        for (var j = 0; j < isobands.features[i].geometry.coordinates.length; j++) {
            for (var m = 0; m < isobands.features[i].geometry.coordinates[j].length; m++) {
                var arrLatLng = [];
                for (var n = 0; n < isobands.features[i].geometry.coordinates[j][m].length; n++) {
                    var x = isobands.features[i].geometry.coordinates[j][m][n][0];
                    var y = isobands.features[i].geometry.coordinates[j][m][n][1];
                    arrLatLng.push([y, x]);
                }
                L.polygon(arrLatLng, symbol).addTo(map);
            }
        }
    }
};