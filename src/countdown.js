class CountDown {
	constructor(dayValue, mounthValue, yearValue, timeValue) {
		this.dayValue = dayValue;
		this.mounthValue = mounthValue;
		this.yearValue = yearValue;
		this.timeValue = timeValue;
		this.date = new Date(`${this.dayValue} ${this.mounthValue} ${this.yearValue} ${this.timeValue}`);
		console.log(`${this.dayValue} ${this.mounthValue} ${this.yearValue} ${this.timeValue}`);
	}
	getDate() {
		return this.date - Date.now();
	}
}

export default CountDown;
