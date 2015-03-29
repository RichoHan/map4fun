var width = 800,
    height = 750;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

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
    
    var list = data.features.filter(function(d) {
        // "民宿之旅"
        // "原民部落"
        // "古蹟文化"
        return d.properties.類別=="古蹟文化";
    });
    console.log(list);
    
    // points
    var array = new Array();
    for (var i=0 ; i<list.length ; i++){
        array.push(list[i].geometry.coordinates);
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
        .attr("fill", "#ECF5FF")

});