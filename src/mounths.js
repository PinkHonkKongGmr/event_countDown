class Mounths {
	constructor() {
		this.mounths = {
			January: {
				name: 'Январь',
				daysPerMounth: () => 31,
			},
			February: {
				name: 'Февраль',
				daysPerMounth: (leap) => (leap ? 29 : 28),
			},
			March: {
				name: 'Март',
				daysPerMounth: () => 31,
			},
			April: {
				name: 'Апрель',
				daysPerMounth: () => 30,
			},
			May: {
				name: 'Май',
				daysPerMounth: () => 31,
			},
			June: {
				name: 'Июнь',
				daysPerMounth: () => 30,
			},
			July: {
				name: 'Июль',
				daysPerMounth: () => 31,
			},
			August: {
				name: 'Август',
				daysPerMounth: () => 31,
			},
			September: {
				name: 'Сентябрь',
				daysPerMounth: () => 30,
			},
			October: {
				name: 'Октябрь',
				daysPerMounth: () => 31,
			},
			November: {
				name: 'Ноябрь',
				daysPerMounth: () => 30,
			},
			December: {
				name: 'Декабрь',
				daysPerMounth: () => 31,
			},
		};
	}

	getMounth(value) {
		for (let key in this.mounths) {
			if (this.mounths[key].name === value) {
				return this.mounths[key];
			}
		}
	}

	getKey(value) {
		for (let key in this.mounths) {
			if (this.mounths[key].name === value) {
				return key;
			}
		}
	}
}

export default new Mounths();
