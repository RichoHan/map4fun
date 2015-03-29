var width = 800,
    height = 750;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var projection = d3.geo.mercator()
    .center([120.9564763, 24.7847717])
    .scale(250000)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

d3.json("hsinchu", function(error, hsinchu) {
    if (error) return console.error(error);
    
    var hsinchu = topojson.feature(hsinchu, hsinchu.objects.Hsinchu)

    svg.append("path")
        .datum(hsinchu)
        .attr("d", path)
        .attr("class", "hsinchu");
});

d3.json("data", function(error, data) {
    if (error) return console.error(error);
    
    var points = topojson.feature(data, data.objects.collection);
    
    // points
    var array = new Array();
    for (var i=0 ; i<points.features.length ; i++){
        array.push(points.features[i].geometry.coordinates);
        console.log(points.features[i].geometry.coordinates);

    }

    // add circles to svg
    svg.selectAll("circle")
        .data(array).enter()
        .append("circle")
        .attr("cx", function (d) {
            return projection(d)[0];
        })
        .attr("cy", function (d) {
            return projection(d)[1];
        })
        .attr("r", "2px")
        .attr("fill", "red")

});