const ResultDb = function (defaultTime) {
	this.db = {
		get day() {
			return this._day;
		},

		set day(value) {
			return (this._day = value);
		},

		get mounthKey() {
			return this._mounthKey;
		},

		set mounthKey(value) {
			return (this._mounthKey = value);
		},

		get mounth() {
			return this._mounth;
		},

		set mounth(value) {
			return (this._mounth = value);
		},

		get year() {
			return this._year;
		},

		set year(value) {
			return (this._year = value);
		},

		get name() {
			return this._name;
		},

		set name(value) {
			return (this._name = value);
		},

		get time() {
			return this._time;
		},

		set time(value) {
			return (this._time = value);
		},

		get needTime() {
			return this._needTime;
		},

		set needTime(value) {
			return (this._needTime = value);
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
			return (this._mounthLeft = value);
		},
		get dayLeft() {
			return this._dayLeft;
		},

		set dayLeft(value) {
			return (this._dayLeft = value);
		},
		get hourLeft() {
			return this._hourLeft;
		},

		set hourLeft(value) {
			return (this._hourLeft = value);
		},
		get minuteLeft() {
			return this._minuteLeft;
		},

		set minuteLeft(value) {
			return (this._minuteLeft = value);
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
	});
};

export default ResultDb;
