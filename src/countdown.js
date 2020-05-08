class CountDown {
	constructor(rdb) {
		this.dayValue = rdb.day;
		this.mounthValue = rdb.mounthKey;
		this.yearValue = rdb.year;
		this.timeValue = rdb.time;
		this.date = new Date(`${this.dayValue} ${this.mounthValue} ${this.yearValue} ${this.timeValue}`);
	}
	getDifferance() {
		return this.date - Date.now();
	}
	getDate() {
		return this.date;
	}
}

export default CountDown;
