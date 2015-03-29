var width = 800,
    height = 750;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("hsinchu", function(error, hsinchu) {
    if (error) return console.error(error);
    
    var hsinchu = topojson.feature(hsinchu, hsinchu.objects.Hsinchu)
    
    var projection = d3.geo.mercator()
        .center([120.9564763, 24.7847717])
        .scale(250000)
        .translate([width / 2, height / 2]);
    
    var path = d3.geo.path()
        .projection(projection);

    svg.append("path")
        .datum(hsinchu)
        .attr("d", path);
});