// тут планирую реализовывать механику предупреждения о скором завершении события
const breakPoints = function (val, rdb, listeners) {
	if (val < 100) {
		listeners.over.forEach((func) => func());
		rdb.over = true;
		return;
	}

	if (val < 1000 * 60 && !rdb.minuteLeft) {
		rdb.minuteLeft = true;
		rdb.hourLeft = true;
		rdb.dayLeft = true;
		rdb.mounthLeft = true;
		listeners.minutes.forEach((func) => func());
		return;
	}

	if (val < 1000 * 60 * 60 && !rdb.hourLeft) {
		rdb.hourLeft = true;
		rdb.dayLeft = true;
		rdb.mounthLeft = true;
		listeners.hours.forEach((func) => func());
		return;
	}

	if (val < 1000 * 60 * 60 * 24 && !rdb.dayLeft) {
		rdb.dayLeft = true;
		rdb.mounthLeft = true;
		listeners.days.forEach((func) => func());
		return;
	}

	if (val < 1000 * 60 * 60 * 24 * 30 && !rdb.mounthLeft) {
		rdb.mounthLeft = true;
		listeners.months.forEach((func) => func());
		return;
	}
};

export default breakPoints;
