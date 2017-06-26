function View(trafficModel, crossingModel) {
    EventEmitter.call(this);
    this._tModel = trafficModel;
    this._cModel = crossingModel;
    this.init();
}

View.prototype = Object.create(EventEmitter.prototype);
View.prototype.constructor = View;

View.prototype.init = function() {
    var btnCall = document.querySelector('#call').appendChild(document.createElement('button'));
    btnCall.textContent = 'Call';
    btnCall.addEventListener('click', this.emit.bind(this, 'call'));

    this._tModel.on('trafficLightChanged', this.displayTrafficLight.bind(this));
    this._cModel.on('crossingLightChanged', this.displayCrossingLight.bind(this))
};

View.prototype.displayTrafficLight = function() {
    var color = this._tModel.getColor();
    var lights = document.querySelectorAll('.traffic.light');
    var targetLights = document.querySelectorAll('.traffic.light.' + color);

    // turn all the lights off
    lights.forEach(function(light) {
        // add the blackout class if necessary
        light.className = light.className.indexOf(' blackout') < 0 ? light.className += ' blackout' : light.className;
    });

    // turn the targetLights on
    targetLights.forEach(function(light) {
        light.className = 'traffic light ' + color;
    });


};

View.prototype.displayCrossingLight = function() {
    var color = this._cModel.getColor();
    var lights = document.querySelectorAll('.crossing.light');
    var targetLights = document.querySelectorAll('.crossing.light.' + color);

    // turn all the lights off
    lights.forEach(function(light) {
        // add the blackout class if necessary
        light.className = light.className.indexOf(' blackout') < 0 ? light.className += ' blackout' : light.className;
    });

    // turn the targetLights on
    targetLights.forEach(function(light) {
        light.className = 'crossing light ' + color;
    });

    // broadcast change
    color = color.charAt(0).toUpperCase() + color.substr(1).toLowerCase();
    this.emit('crossing' + color);
};