const year = {
	set year(value) {
		this._year = value;
	},
	get year() {
		return this._year;
	},
	get leap() {
		return this._year % 4 === 0 ? true : false;
	},
};

Object.defineProperty(year, '_year', {
	value: new Date().getUTCFullYear(),
	writable: true,
});

export default year;
