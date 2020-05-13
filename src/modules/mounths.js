class Mounths {
	constructor() {
		this.mounths = {
			January: {
				name: 'Январь',
				genetive: 'Января',
				daysPerMounth: () => 31,
			},
			February: {
				name: 'Февраль',
				genetive: 'Февраля',
				daysPerMounth: (leap) => (leap ? 29 : 28),
			},
			March: {
				name: 'Март',
				genetive: 'Марта',
				daysPerMounth: () => 31,
			},
			April: {
				name: 'Апрель',
				genetive: 'Апреля',
				daysPerMounth: () => 30,
			},
			May: {
				name: 'Май',
				genetive: 'Мая',
				daysPerMounth: () => 31,
			},
			June: {
				name: 'Июнь',
				genetive: 'Июня',
				daysPerMounth: () => 30,
			},
			July: {
				name: 'Июль',
				genetive: 'Июля',
				daysPerMounth: () => 31,
			},
			August: {
				name: 'Август',
				genetive: 'Августа',
				daysPerMounth: () => 31,
			},
			September: {
				name: 'Сентябрь',
				genetive: 'Сентября',
				daysPerMounth: () => 30,
			},
			October: {
				name: 'Октябрь',
				genetive: 'Октября',
				daysPerMounth: () => 31,
			},
			November: {
				name: 'Ноябрь',
				genetive: 'Ноября',
				daysPerMounth: () => 30,
			},
			December: {
				name: 'Декабрь',
				genetive: 'Декабря',
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
