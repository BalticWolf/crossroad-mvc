function CrossingLightModel() {
    EventEmitter.call(this);
    this.init();
}

CrossingLightModel.prototype = Object.create(EventEmitter.prototype);
CrossingLightModel.prototype.constructor = CrossingLightModel;

CrossingLightModel.prototype.init = function() {
    this._color = 'red';
};

CrossingLightModel.prototype.getColor = function() {
    return this._color;
};

CrossingLightModel.prototype.setColor = function(color) {
    this._color = color;
    this.emit('crossingLightChanged');
};
