import Mounths from './mounths';
import { generateSelectorBlock, disableBtn, leftToWaitRenderer, hideControlElements, badResult } from './domlib';
import dateCompiler from './dateCompiler';
import timeFormatter from './timeFormatter';
import ResultDb from './resultDb';
import uniqid from 'uniqid';
import { arrayCreator, putToLocalStorage } from './helpers';

const DataEngine = function () {
	this.Block = generateSelectorBlock();
	this.key = uniqid();
	this.resultDb = new ResultDb(this.Block.eventTime.time, Mounths.mounths).db;

	const key = this.key;
	let interval = null;
	const Block = this.Block;
	const resultDb = this.resultDb;
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

	this.stopInterval = () => {
		if (interval !== null) clearInterval(interval);
	};

	this.nameInputHandler = (e) => {
		resultDb.name = e.target.value.trim();
		Block.startBtnEnableController();
	};

	this.yearInputhandler = (e) => {
		if (!e.target.value.match(/[^0-9]/)) {
			// объект с годом нужен для корректного выстраивания февраля
			// там определяется сколько дней 28 или 29
			Block.yearInstance.year = e.target.value.trim();
			resultDb.year = Block.yearInstance.year;
			activateController(resultDb.mounth);
		}
	};

	this.timeInputHandler = (e) => {
		// объект со временем предназначен на случай если пользователь переключит тогглер, но введет криво,
		// кроме того там сеттер для определения вывода времени в итоге
		Block.eventTime.time = e.target.value;
		resultDb.time = Block.eventTime.time;
		Block.eventTime.needTime = true;
	};

	this.needTimeCheckBoxHandler = () => {
		Block.timeInput.disabled = !Block.timeInput.disabled;
		Block.eventTime.needTime = !Block.eventTime.needTime;
		resultDb.needTime = Block.eventTime.needTime;
	};

	this.dayInputHandler = (e) => (resultDb.day = e.target.value);

	this.mouthInputHandler = (e) => {
		resultDb.mounth = e.target.value;
		resultDb.mounthKey = Mounths.getKey(e.target.value);
		activateController(resultDb.mounth);
	};

	this.startBtnhandler = (e) => {
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
};

export default DataEngine;
