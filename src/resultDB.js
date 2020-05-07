const ResultDb = function () {
	this.db = {
		date: null,
		day: 1,
		mounthKey: 'January',
		mounth: 'Январь',
		year: new Date().getUTCFullYear(),
		name: null,
		time: '00:00',
	};
};

export default ResultDb;
