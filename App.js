window.onload = function() {
    var tModel = new TrafficLightModel();
    var cModel = new CrossingLightModel();
    var view = new View(tModel, cModel);
    new Controller(tModel, cModel, view);
};