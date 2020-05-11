const ResultDb = function (defaultTime, mounths) {
	this.db = {
		get day() {
			return this._day;
		},

		set day(value) {
			value = parseInt(value, 10);
			let val = value !== NaN ? value : this._day;
			return (this._day = val);
		},

		get mounthKey() {
			return this._mounthKey;
		},

		set mounthKey(value) {
			let val = mounths.hasOwnProperty(value) ? value : this._day;
			return (this._mounthKey = val);
		},

		get mounth() {
			return this._mounth;
		},

		set mounth(value) {
			let val = this._mounth;
			for (let key in mounths) {
				if (mounths[key].name === value) val = value;
			}
			return (this._mounth = val);
		},

		get year() {
			return this._year;
		},

		set year(value) {
			value = parseInt(value, 10);
			let val = value !== NaN ? value : this._year;
			return (this._year = val);
		},

		get name() {
			return this._name;
		},

		set name(value) {
			if (typeof value === 'number' || typeof value === 'string') {
				return (this._name = value);
			} else {
				return (this._name = this._name);
			}
		},

		get time() {
			return this._time;
		},

		set time(value) {
			let val = value.split(':');
			if (parseInt(val[0]) > -1 && parseInt(val[0]) < 24 && parseInt(val[0]) > -1 && parseInt(val[0]) < 60) {
				return (this._time = value);
			}
			return (this._time = this._time);
		},

		get needTime() {
			return this._needTime;
		},

		set needTime(value) {
			let val = typeof value === 'boolean' ? value : this._needTime;
			return (this._needTime = val);
		},

		get key() {
			return this._key;
		},

		set key(value) {
			return (this._key = value);
		},
		get mounthLeft() {
			return this._mounthLeft;
		},

		set mounthLeft(value) {
			let val = typeof value === 'boolean' ? value : this._mounthLeft;
			return (this._mounthLeft = val);
		},
		get dayLeft() {
			return this._dayLeft;
		},

		set dayLeft(value) {
			let val = typeof value === 'boolean' ? value : this._dayLeft;
			return (this._dayLeft = val);
		},
		get hourLeft() {
			return this._hourLeft;
		},

		set hourLeft(value) {
			let val = typeof value === 'boolean' ? value : this._hourLeft;
			return (this._hourLeft = val);
		},
		get minuteLeft() {
			return this._minuteLeft;
		},

		set minuteLeft(value) {
			let val = typeof value === 'boolean' ? value : this._minuteLeft;
			return (this._minuteLeft = val);
		},
		get over() {
			return this._over;
		},

		set over(value) {
			let val = typeof value === 'boolean' ? value : this._over;
			return (this._over = val);
		},
	};

	Object.defineProperties(this.db, {
		_day: {
			value: 1,
			writable: true,
		},
		_mounthKey: {
			value: 'January',
			writable: true,
		},
		_mounth: {
			value: 'Январь',
			writable: true,
		},
		_year: {
			value: new Date().getUTCFullYear(),
			writable: true,
		},
		_name: {
			writable: true,
		},
		_time: {
			value: defaultTime,
			writable: true,
		},
		_needTime: {
			value: false,
			writable: true,
		},
		_key: {
			writable: true,
		},
		_mounthLeft: {
			value: false,
			writable: true,
		},
		_dayLeft: {
			value: false,
			writable: true,
		},
		_hourLeft: {
			value: false,
			writable: true,
		},
		_minuteLeft: {
			value: false,
			writable: true,
		},
		_over: {
			value: false,
			writable: true,
		},
	});
};

export default ResultDb;
