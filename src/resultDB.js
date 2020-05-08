const ResultDb = function (defaultTime) {
	this.db = {
		get date() {
			return this._date;
		},

		set date(value) {
			return (this._date = value);
		},

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
	};

	Object.defineProperties(this.db, {
		_date: {
			writable: true,
		},
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
		key: {
			writable: true,
		},
	});
};

export default ResultDb;
