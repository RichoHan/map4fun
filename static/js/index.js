// var map = new Datamap({
//     element: document.getElementById('container'),
    
//     geographyConfig: {
//         dataUrl: '/hsinchu'
//     },

//     scope: 'custom',

//     setProjection: function(element, options) {
//         var projection, path;

//         projection = d3.geo.albersUsa()
//         .scale(element.offsetWidth)
//         .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
    
//         path = d3.geo.path()
//         .projection( projection );

//         return {
//             path: path, projection: projection
//         };
//     }
// });

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