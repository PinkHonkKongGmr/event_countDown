class CountDown {
	constructor(dayValue, mounthValue, yearValue) {
		this.dayValue = dayValue;
		this.mounthValue = mounthValue;
		this.yearValue = yearValue;
		this.date = new Date(`${this.dayValue} ${this.mounthValue} ${this.yearValue}`);
	}
	getDate() {
		return this.date - Date.now();
	}
}

export default CountDown;
