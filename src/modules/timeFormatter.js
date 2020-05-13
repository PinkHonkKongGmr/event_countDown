const timeFormatter = (ms) => {
	let minutes = 0;
	let hours = 0;
	let days = 0;
	let mounths = 0;
	let seconds = ms / 1000;
	if (seconds < 60) {
		return { seconds: Math.round(seconds), minutes, hours, days, mounths };
	} else {
		minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds - minutes * 60);
		if (minutes < 60) {
			return { seconds, minutes, hours, days, mounths };
		} else {
			hours = Math.floor(minutes / 60);
			minutes = minutes - hours * 60;
			if (hours < 24) {
				return { seconds, minutes, hours, days, mounths };
			} else {
				days = Math.floor(hours / 24);
				hours = hours - days * 24;
				if (days < 30.5) {
					return {
						seconds,
						minutes,
						hours,
						days,
						mounths,
					};
				} else {
					mounths = Math.floor(days / 30.5);
					days = Math.floor(days - mounths * 30.5);
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

const result = (ms) => {
	if (ms < 0) {
		return null;
	} else {
		return timeFormatter(ms);
	}
};

export default result;
