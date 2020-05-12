import Mounths from './mounths';
import { generateSelectorBlock, disableBtn, leftToWaitRenderer, hideControlElements, badResult } from './domlib';
import dateCompiler from './dateCompiler';
import timeFormatter from './timeFormatter';
import resultDb from './resultDb';
import uniqid from 'uniqid';
import { putToLocalStorage } from './helpers';

const DataEngine = function () {
	this.key = uniqid();
	this.interval = null;
	this.Block = generateSelectorBlock();
	this.resultDb = new resultDb(this.Block.eventTime.time, Mounths.mounths).db;

	this.resultDb.key = this.key;

	this.nameInputHandler = (e) => {
		this.resultDb.name = e.target.value.trim();
		this.Block.startBtnEnableController();
	};

	this.yearInputhandler = (e) => {
		if (!e.target.value.match(/[^0-9]/)) {
			// объект с годом нужен для корректного выстраивания февраля
			// там определяется сколько дней 28 или 29
			this.Block.yearInstance.year = e.target.value.trim();
			this.resultDb.year = this.Block.yearInstance.year;
		}
	};

	this.timeInputHandler = (e) => {
		// объект со временем предназначен на случай если пользователь переключит тогглер, но введет криво,
		// кроме того там сеттер для определения вывода времени в итоге
		this.Block.eventTime.time = e.target.value;
		this.resultDb.time = this.Block.eventTime.time;
		this.Block.eventTime.needTime = true;
	};

	this.needTimeCheckBoxHandler = () => {
		this.Block.timeInput.disabled = !this.Block.timeInput.disabled;
		this.Block.eventTime.needTime = !this.Block.eventTime.needTime;
		this.resultDb.needTime = this.Block.eventTime.needTime;
	};

	this.dayInputHandler = (e) => (this.resultDb.day = e.target.value);

	this.mouthInputHandler = (e) => {
		this.resultDb.mounth = e.target.value;
		this.resultDb.mounthKey = Mounths.getKey(e.target.value);
	};

	this.startBtnhandler = (e) => {
		e.preventDefault();
		disableBtn(this.Block);
		let dc = new dateCompiler(this.resultDb);
		this.resultDb.date = dc.getDate();
		if (timeFormatter(dc.getDifferance()) !== null) {
			putToLocalStorage(this.key, this.resultDb);
			hideControlElements(this.Block);
			// такая конструкция позволяет как делать функцию универсальной, тоесть и для создаваемого блока и блока из хранилища
			// так и позволяет получать доступ к интервалам для их сбрасывания
			this.interval = leftToWaitRenderer(this.Block, dc, this.resultDb);
		} else {
			this.Block.leftToWait.appendChild(badResult(this.Block));
		}
	};
};

export default DataEngine;
