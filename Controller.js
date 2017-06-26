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
};

/**
 * This controls the system's behavior when the 'Call' button is pushed
 */
Controller.prototype.handleCall = function() {

    // only run if the button is activated
    if (!this._locked){

        // deactivate the 'Call' button
        this._locked = true;

        // start the crossing light to blink red (change every half second)
        this._cModel.setColor('black');
        this._interval = setInterval(function () {
            var color = this._cModel.getColor() !== 'red' ? 'red' : 'black';
            this._cModel.setColor(color);
        }.bind(this), 500);

        // set the traffic light to turn orange after 3 seconds
        setTimeout(function() {
            this._tModel.setColor('orange');
        }.bind(this), 3000);
    }
};

/**
 * This controls the system's behavior when the traffic light goes green
 */
Controller.prototype.handleTrafficGreen = function() {

    // reset the crossing light to steady red
    this._cModel.setColor('red');

    // reactivate the 'Call' button after 180 seconds
    setTimeout(function() {
        this._locked = false;
    }.bind(this), 180000);
};


/**
 * This controls the system's behavior when the traffic light goes orange
 */
Controller.prototype.handleTrafficOrange = function() {

    // stop the red blinking
    clearInterval(this._interval);
    this._interval = null;

    // set the crossing light to turn steady orange
    this._cModel.setColor('orange');

    // set the traffic light to turn red after 3 seconds
    setTimeout(function() {
        this._tModel.setColor('red');
    }.bind(this), 3000);
};

/**
 * This controls the system's behavior when the traffic light goes orange
 */
Controller.prototype.handleTrafficRed = function() {

    // set the traffic light to turn back green after 22 seconds
    setTimeout(function() {
        this._tModel.setColor('green');
    }.bind(this), 22000);

    // start the crossing light to blink orange (change every half second)
    this._cModel.setColor('black');
    this._interval = setInterval(function () {
        var color = this._cModel.getColor() !== 'orange' ? 'orange' : 'black';
        this._cModel.setColor(color);
    }.bind(this), 500);

    // set the crossing light to turn steady orange after 17 seconds
    setTimeout(function() {
        clearInterval(this._interval);
        this._interval = null;
        this._cModel.setColor('orange');
    }.bind(this), 17000);
};
