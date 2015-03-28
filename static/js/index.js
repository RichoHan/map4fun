<script>
    var map = new Datamap({
        element: document.getElementById('container'),
        geographyConfig: {
            dataUrl: '/hsinchu'
        },
        scope: 'custom',
        setProjection: function(element, options) {
            var projection, path;
            projection = d3.geo.albersUsa()
                .scale(element.offsetWidth)
                .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
}
            path = d3.geo.path()
                .projection( projection );

            return {path: path, projection: projection};
        }
    });
</script>