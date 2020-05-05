const timeFormatter = (ms) => {
	let minutes;
	let hours;
	let days;
	let mounths;
	let seconds = ms / 1000;
	if (seconds < 60) {
		return { seconds: Math.round(seconds) };
	} else {
		minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds - minutes * 60);
		if (minutes < 60) {
			return { seconds, minutes };
		} else {
			hours = Math.floor(minutes / 60);
			minutes = minutes - hours * 60;
			if (hours < 24) {
				return { seconds, minutes, hours };
			} else {
				days = Math.floor(hours / 24);
				hours = hours - days * 24;
				if (days / 30.5) {
					return {
						seconds,
						minutes,
						hours,
						days,
					};
				} else {
					mounths = Math.floor(days / 30.5);
					days = days - mounths * 30.5;
					return {
						seconds,
						minutes,
						hours,
						days,
						mounths,
					};
				}
			}
		}
	}
};

const result = (ms) =>
	Object.entries(timeFormatter(ms))
		.join(',')
		.replace(/seconds/, 'секунды')
		.replace(/minutes/, 'минуты')
		.replace(/days/, 'дни')
		.replace(/hours/, 'часы')
		.replace(/mounths/, 'месяцы')
		.replace(/,/gi, ': ');

export default result;
