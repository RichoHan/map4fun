var width = 800,
    height = 750;

var svg = d3.select(".map_container").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "map");

var projection = d3.geo.mercator()
    .center([121.1722058, 24.6869505])
    .scale(60000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

$( document ).ready(function() {

    $('.ui.card').hide();

});

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
    var point_a = new Array();
    for (var i=0 ; i<list_a.length ; i++){
        point_a.push(list_a[i]);
    }

    var point_b = new Array();
    for (var i=0 ; i<list_b.length ; i++){
        point_b.push(list_b[i]);
    }

    var point_c = new Array();
    for (var i=0 ; i<list_c.length ; i++){
        point_c.push(list_c[i]);
    }

    // add circles to svg
    svg.selectAll(".map")
        .data(point_a).enter()
        .append("circle")
        .attr("cx", function (d) {
            return projection(d.geometry.coordinates)[0];
        })
        .attr("cy", function (d) {
            return projection(d.geometry.coordinates)[1];
        })
        .attr("r", "4px")
        .attr("class", "a")
        .attr("display", "none")
        .on('mouseover', function(d){

            $('.ui.card .image .street_view').attr("src", "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + d.properties.位置地址 + "&sensor=false");

            $('.ui.card .content .header').text(d.properties.name);
            $('.ui.card .content .meta').text(d.properties.位置地址);
            $('.ui.card .content .description').text(d.properties.簡介);
            $('.ui.card').show();
        })
        .on('mouseleave', function(d){
            // $('.ui.card').hide();
        });

    svg.selectAll(".map")
        .data(point_b).enter()
        .append("circle")
        .attr("cx", function (d) {
            return projection(d.geometry.coordinates)[0];
        })
        .attr("cy", function (d) {
            return projection(d.geometry.coordinates)[1];
        })
        .attr("r", "4px")
        .attr("class", "b")
        .attr("display", "none")
        .on('mouseover', function(d){
            $('.ui.card .image .street_view').attr("src", "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + d.properties.位置地址 + "&sensor=false");
            $('.ui.card .content .header').text(d.properties.name);
            $('.ui.card .content .meta').text(d.properties.位置地址);
            $('.ui.card .content .description').text(d.properties.簡介);
            $('.ui.card').show();
        })
        .on('mouseleave', function(d){
            // $('.ui.card').hide();
        });

    svg.selectAll(".map")
        .data(point_c).enter()
        .append("circle")
        .attr("cx", function (d) {
            return projection(d.geometry.coordinates)[0];
        })
        .attr("cy", function (d) {
            return projection(d.geometry.coordinates)[1];
        })
        .attr("r", "4px")
        .attr("class", "c")
        .attr("display", "none")
        .on('mouseover', function(d){
            $('.ui.card .image .street_view').attr("src", "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + d.properties.位置地址 + "&sensor=false");
            $('.ui.card .content .header').text(d.properties.name);
            $('.ui.card .content .meta').text(d.properties.位置地址);
            $('.ui.card .content .description').text(d.properties.簡介);
            $('.ui.card').show();
        })
        .on('mouseleave', function(d){
            // $('.ui.card').hide();
        });

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