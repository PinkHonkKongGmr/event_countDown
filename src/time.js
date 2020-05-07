const Time = function () {
	this.eventTime = {
		set time(value) {
			if (value.length > 0) {
				return (this._time = `${value}`);
			} else {
				return (this._time = '00:00');
			}
		},
		get time() {
			return this._time;
		},
	};
	Object.defineProperty(this.eventTime, '_time', {
		value: '00:00',
		writable: true,
	});
};

export default Time;
