const ListenersStorage = function (rdb) {
	this.listeners = {
		minutes: [() => alert(`событие ${rdb.name} выполниться меньше чем через минуту`)],
		hours: [() => alert(`событие ${rdb.name} выполниться меньше чем через час`)],
		days: [() => alert(`событие ${rdb.name} выполниться меньше чем через день`)],
		months: [() => alert(`событие ${rdb.name} выполниться меньше чем через месяц`)],
	};
};

export default ListenersStorage;
