onmessage = function(e) {

    var xhr = new XMLHttpRequest();

    var model = e.data[0];

    getJSON(model);

    function getJSON(model) {

        xhr.addEventListener('load', function(ev) {
            if (xhr.status == 200) {
                var json = JSON.parse(xhr.response);
                var objectProperties = {};
                
                objectProperties.lightmapEnabled = model.lightmapEnabled;
                objectProperties.frontsideEnabled = model.frontsideEnabled;
                objectProperties.receiveShadows = model.receiveShadows;
                objectProperties.dimensionsPath = model.dimensionsPath;
                objectProperties.name = model.name;

                objectProperties.translation = [
                    model.translateX * 100,
                    model.translateY * 100,
                    model.translateZ * -100,
                ];

                objectProperties.rotateY = model.rotation * Math.PI;   
                json.properties = objectProperties;

                postMessage([json]);
            }
        }, false);

        try {
            xhr.open('GET', model.path, true);
        }
        catch(e) {
            postMessage([e]);
        }
        finally {
            xhr.send(null);
        }
    }
}