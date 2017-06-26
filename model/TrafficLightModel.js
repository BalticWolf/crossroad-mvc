function TrafficLightModel() {
    EventEmitter.call(this);
    this.init();
}

TrafficLightModel.prototype = Object.create(EventEmitter.prototype);
TrafficLightModel.prototype.constructor = TrafficLightModel;

TrafficLightModel.prototype.init = function() {
    this._color = 'green';
};

TrafficLightModel.prototype.getColor = function() {
    return this._color;
};

TrafficLightModel.prototype.setColor = function(color) {
    this._color = color;

    // broadcast change
    color = color.charAt(0).toUpperCase() + color.substr(1).toLowerCase();
    this.emit('traffic' + color);
    this.emit('trafficLightChanged');
};
