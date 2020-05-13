const ListenersStorage = function (rdb, block) {
	this.listeners = {
		minutes: [() => alert(`событие ${rdb.name} выполниться меньше чем через минуту`)],
		hours: [() => alert(`событие ${rdb.name} выполниться меньше чем через час`)],
		days: [() => alert(`событие ${rdb.name} выполниться меньше чем через день`)],
		months: [() => alert(`событие ${rdb.name} выполниться меньше чем через месяц`)],
		over: [() => (block.leftToWait.innerHTML = `Событие ${rdb.name} завершено`)],
	};
};

export default ListenersStorage;
