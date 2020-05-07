class CountDown {
	constructor(rdb) {
		this.dayValue = rdb.day;
		this.mounthValue = rdb.mounth;
		this.yearValue = rdb.year;
		this.timeValue = rdb.time;
		this.date = new Date(`${this.dayValue} ${this.mounthValue} ${this.yearValue} ${this.timeValue}`);
		rdb.date = this.date;
	}
	getDate() {
		return this.date - Date.now();
	}
}

export default CountDown;
