const timeFormatter = (ms) => {
	let minutes;
	let hours;
	let days;
	let mounths;
	let seconds = ms / 1000;
	if (seconds < 60) {
		return { seconds: Math.round(seconds) };
	} else {
		minutes = seconds / 60;
		seconds = minutes % 60;
		if (minutes < 60) {
			return { seconds: Math.round(seconds), minutes: Math.round(minutes) };
		} else {
			hours = minutes / 60;
			minutes = hours % 60;
			if (hours < 24) {
				return { seconds: Math.round(seconds), minutes: Math.round(minutes), hours: Math.round(hours) };
			} else {
				days = hours / 24;
				hours = days % 24;
				if (days / 30.5) {
					return {
						seconds: Math.round(seconds),
						minutes: Math.round(minutes),
						hours: Math.round(hours),
						days: Math.round(days),
					};
				} else {
					mounths = days / 30.5;
					days = mounths % 30.5;
					return {
						seconds: Math.round(seconds),
						minutes: Math.round(minutes),
						hours: Math.round(hours),
						days: Math.round(days),
						mounths: Math.round(mounths),
					};
				}
			}
		}
	}
};

const result = (ms) => JSON.stringify(timeFormatter(ms));

export default result;
