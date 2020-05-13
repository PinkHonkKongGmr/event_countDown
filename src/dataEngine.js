import Mounths from './mounths';
import { generateSelectorBlock, disableBtn, leftToWaitRenderer, hideControlElements, badResult } from './domlib';
import dateCompiler from './dateCompiler';
import timeFormatter from './timeFormatter';
import ResultDb from './resultDb';
import uniqid from 'uniqid';
import { arrayCreator, putToLocalStorage, deletFromLocalStorage } from './helpers';

const DataEngine = function (root) {
	this.Block = generateSelectorBlock();
	const key = uniqid();
	let interval = null;
	const Block = this.Block;
	const resultDb = new ResultDb(this.Block.eventTime.time, Mounths.mounths).db;
	resultDb.key = key;

	// отрисовка дефолтных состояний
	const renderDays = (val) => {
		if (val.length > 0) {
			Block.selectDays.clearContent();
			Block.selectDays.addOptions(arrayCreator(Mounths.getMounth(val).daysPerMounth(Block.yearInstance.leap)));
		}
	};

	const activateController = (days) => {
		renderDays(days);
		Block.startBtnEnableController();
	};

	renderDays(Mounths.mounths.January.name);
	// select.options  по индексу выдает undefined
	Block.selectMounths.addOptions(Object.entries(Mounths.mounths).map((mounth) => mounth[1].name));
	// отрисовка завершена

	const stopInterval = () => {
		if (interval !== null) clearInterval(interval);
	};

	const nameInputHandler = (e) => {
		resultDb.name = e.target.value.trim();
		Block.startBtnEnableController();
	};

	const yearInputhandler = (e) => {
		if (!e.target.value.match(/[^0-9]/)) {
			// объект с годом нужен для корректного выстраивания февраля
			// там определяется сколько дней 28 или 29
			Block.yearInstance.year = e.target.value.trim();
			resultDb.year = Block.yearInstance.year;
			activateController(resultDb.mounth);
		}
	};

	const timeInputHandler = (e) => {
		// объект со временем предназначен на случай если пользователь переключит тогглер, но введет криво,
		// кроме того там сеттер для определения вывода времени в итоге
		Block.eventTime.time = e.target.value;
		resultDb.time = Block.eventTime.time;
		Block.eventTime.needTime = true;
	};

	const needTimeCheckBoxHandler = () => {
		Block.timeInput.disabled = !Block.timeInput.disabled;
		Block.eventTime.needTime = !Block.eventTime.needTime;
		resultDb.needTime = Block.eventTime.needTime;
	};

	const dayInputHandler = (e) => (resultDb.day = e.target.value);

	const mouthInputHandler = (e) => {
		resultDb.mounth = e.target.value;
		resultDb.mounthKey = Mounths.getKey(e.target.value);
		activateController(resultDb.mounth);
	};

	const startBtnhandler = (e) => {
		e.preventDefault();
		disableBtn(Block);
		let dc = new dateCompiler(resultDb);
		resultDb.date = dc.getDate();
		if (timeFormatter(dc.getDifferance()) !== null) {
			putToLocalStorage(key, resultDb);
			hideControlElements(Block);
			// такая конструкция позволяет как делать функцию универсальной, тоесть и для создаваемого блока и блока из хранилища
			// так и позволяет получать доступ к интервалам для их сбрасывания
			interval = leftToWaitRenderer(Block, dc, resultDb);
		} else {
			Block.leftToWait.appendChild(badResult(Block));
		}
	};

	const removeBtnHandler = (e) => {
		e.preventDefault();
		stopInterval();
		root.removeChild(Block.wrapper);
		deletFromLocalStorage(key);
		eventDestroyer();
	};

	const eventBindler = new Map([
		[Block.nameInput, { event: 'input', handler: nameInputHandler }],
		[Block.yearInput, { event: 'input', handler: yearInputhandler }],
		[Block.timeInput, { event: 'input', handler: timeInputHandler }],
		[Block.needTimeCheckBox, { event: 'change', handler: needTimeCheckBoxHandler }],
		[Block.selectDays.getInstance(), { event: 'change', handler: dayInputHandler }],
		[Block.selectMounths.getInstance(), { event: 'change', handler: mouthInputHandler }],
		[Block.startBtn, { event: 'click', handler: startBtnhandler }],
		[Block.removeBtn, { event: 'click', handler: removeBtnHandler }],
	]);

	this.eventBindler = () => {
		for (let [key, value] of eventBindler) {
			key.addEventListener(value.event, value.handler);
		}
	};

	const eventDestroyer = () => {
		for (let [key, value] of eventBindler) {
			key.removeEventListener(value.event, value.handler);
		}
	};
};

export default DataEngine;
