var width = 800,
    height = 750;

var svg = d3.select(".container").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "map");

var projection = d3.geo.mercator()
    .center([121.1722058, 24.6869505])
    .scale(60000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

d3.json("hsinchu", function(error, hsinchu) {
    if (error) return console.error(error);
    
    var hsinchu = topojson.feature(hsinchu, hsinchu.objects.HsinchuAll)

    svg.append("path")
        .datum(hsinchu)
        .attr("d", path)
        .attr("class", "hsinchu");
});

d3.json("data", function(error, data) {
    if (error) return console.error(error);
    
    var list_a = data.features.filter(function(d) {
        return d.properties.類別=="民宿之旅";
    });

    var list_b = data.features.filter(function(d) {
        return d.properties.類別=="原民部落";
    });

    var list_c = data.features.filter(function(d) {
        return d.properties.類別=="古蹟文化";
    });
    
    // points
    var array_a = new Array();
    for (var i=0 ; i<list_a.length ; i++){
        array_a.push(list_a[i].geometry.coordinates);
    }

    var array_b = new Array();
    for (var i=0 ; i<list_b.length ; i++){
        array_b.push(list_b[i].geometry.coordinates);
    }

    var array_c = new Array();
    for (var i=0 ; i<list_c.length ; i++){
        array_c.push(list_c[i].geometry.coordinates);
    }

    // add circles to svg
    svg.selectAll(".map")
        .data(array_a).enter()
        .append("circle")
        .attr("cx", function (d) {
            return projection(d)[0];
        })
        .attr("cy", function (d) {
            return projection(d)[1];
        })
        .attr("r", "2px")
        .attr("class", "a")
        .attr("display", "none");

    svg.selectAll(".map")
        .data(array_b).enter()
        .append("circle")
        .attr("cx", function (d) {
            return projection(d)[0];
        })
        .attr("cy", function (d) {
            return projection(d)[1];
        })
        .attr("r", "2px")
        .attr("class", "b")
        .attr("display", "none");

    svg.selectAll(".map")
        .data(array_c).enter()
        .append("circle")
        .attr("cx", function (d) {
            return projection(d)[0];
        })
        .attr("cy", function (d) {
            return projection(d)[1];
        })
        .attr("r", "2px")
        .attr("class", "c")
        .attr("display", "none");

});

$('.ui.checkbox.place_a')
    .checkbox({
        onUnchecked: function() {
            $('.a').hide();
        },onChecked: function() {
            $('.a').show();
        }
    })
;

$('.ui.checkbox.place_b')
    .checkbox({
        onUnchecked: function() {
            $('.b').hide();
        },onChecked: function() {
            $('.b').show();
        }
    })
;

$('.ui.checkbox.place_c')
    .checkbox({
        onUnchecked: function() {
            $('.c').hide();
        },onChecked: function() {
            $('.c').show();
        }
    })
;