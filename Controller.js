function Controller(trafficModel, crossingModel, view) {
    this._tModel = trafficModel;
    this._cModel = crossingModel;
    this._view = view;
    this._interval = null;

    this.init();
}

Controller.prototype.init = function() {
    this._locked = false;
    this._view.on('call', this.handleCall.bind(this));
    this._tModel.on('trafficGreen', this.handleTrafficGreen.bind(this));
    this._tModel.on('trafficOrange', this.handleTrafficOrange.bind(this));
    this._tModel.on('trafficRed', this.handleTrafficRed.bind(this));

    this._view.on('crossingOrange', this.handleCrossingOrange.bind(this));
};

Controller.prototype.handleCall = function() {
    if (!this._locked){
        this._locked = true; // memorize the 'Call' button has been pushed
        this._cModel.setColor('black');
        this._interval = setInterval(function () {
            var color = this._cModel.getColor() !== 'red' ? 'red' : 'black';
            this._cModel.setColor(color);
        }.bind(this), 500);

        setTimeout(function() {
            this._cModel.setColor('orange');
        }.bind(this), 6000);

        setTimeout(function() {
            this._tModel.setColor('orange');
        }.bind(this), 3000);
    }
};

Controller.prototype.handleTrafficGreen = function() {
    setTimeout(function() {
        this._locked = false; // reset after 180 seconds
    }.bind(this), 180000);
};

Controller.prototype.handleTrafficOrange = function() {
    setTimeout(function() {
        // Traffic light
        this._tModel.setColor('red');

        // Crossing lights are blinking orange
        this._interval = setInterval(function () {
            var color = this._cModel.getColor() !== 'orange' ? 'orange' : 'black';
            this._cModel.setColor(color);
        }.bind(this), 500);
    }.bind(this), 3000);
};

Controller.prototype.handleTrafficRed = function() {
    setTimeout(function() {
        this._tModel.setColor('green');
    }.bind(this), 22000);

    // make the 5 last seconds not blink but steady orange
/*    setTimeout(function() {
        clearInterval(this._interval);
        this._interval = null;
        this._cModel.setColor('orange');
    }.bind(this), 17000);*/
};

Controller.prototype.handleCrossingOrange = function() {
    setTimeout(function() {
        this._cModel.setColor('red');
    }.bind(this), 22000);
};