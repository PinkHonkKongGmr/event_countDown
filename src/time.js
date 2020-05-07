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

		get needTime() {
			return this._needTime;
		},
		set needTime(a) {
			return (this._needTime = true);
		},
	};
	Object.defineProperties(this.eventTime, {
		_time: {
			value: '00:00',
			writable: true,
		},
		_needTime: {
			value: false,
			writable: true,
		},
	});
};

export default Time;
