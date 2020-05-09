import Mounths from './mounths';
import { arrayCreator, putToLocalStorage, deletFromLocalStorage } from './helpers';
import { generateSelectorBlock, disableBtn, leftToWaitRenderer, hideControlElements, badResult } from './domlib';
import CountDown from './countdown';
import timeFormatter from './timeFormatter';
import ResultDb from './resultDB';
import uniqid from 'uniqid';

function EventBlock(root) {
	let key = uniqid();
	let interval = null;
	const Block = generateSelectorBlock();
	let resultDb = new ResultDb(Block.eventTime.time).db;
	resultDb.key = key;
	this.createBlock = () => {
		const renderDays = (val) => {
			if (val.length > 0) {
				Block.selectDays.clearContent();
				Block.selectDays.addOptions(
					arrayCreator(Mounths.getMounth(val).daysPerMounth(Block.yearInstance.leap))
				);
				// решил сделать по дефолту доступным
				// Block.selectDays.enable();
			}
		};

		renderDays(Mounths.mounths.January.name);
		// select.options  по индексу выдает undefined

		const activateController = (days) => {
			renderDays(days);
			Block.startBtnEnableController();
		};

		Block.nameInput.addEventListener('input', (e) => {
			resultDb.name = e.target.value.trim();
			Block.startBtnEnableController();
		});

		Block.yearInput.addEventListener('input', (e) => {
			if (!e.target.value.match(/[^0-9]/)) {
				// объект с годом нужен для корректного выстраивания февраля
				// там определяется сколько дней 28 или 29
				Block.yearInstance.year = e.target.value.trim();
				resultDb.year = Block.yearInstance.year;
				activateController(Block.selectMounths.getInstance().value);
			}
		});

		Block.timeInput.addEventListener('input', (e) => {
			// объект со временем предназначен на случай если пользователь переключит тогглер, но введет криво,
			// кроме того там сеттер для определения вывода времени в итоге
			Block.eventTime.time = e.target.value;
			resultDb.time = Block.eventTime.time;
			Block.eventTime.needTime = true;
		});

		Block.needTimeCheckBox.addEventListener('change', () => {
			Block.timeInput.disabled = !Block.timeInput.disabled;
			Block.eventTime.needTime = !Block.eventTime.needTime;
			resultDb.needTime = Block.eventTime.needTime;
		});

		Block.selectDays.getInstance().addEventListener('change', (e) => (resultDb.day = e.target.value));

		Block.selectMounths.getInstance().addEventListener('change', (e) => {
			resultDb.mounth = e.target.value;
			resultDb.mounthKey = Mounths.getKey(e.target.value);
			activateController(e.target.value);
		});
		Block.selectMounths.addOptions(Object.entries(Mounths.mounths).map((mounth) => mounth[1].name));

		Block.startBtn.addEventListener('click', (e) => {
			e.preventDefault();
			disableBtn(Block);
			let cd = new CountDown(resultDb);
			resultDb.date = cd.getDate();
			if (timeFormatter(cd.getDifferance()) !== null) {
				putToLocalStorage(key, resultDb);
				hideControlElements(Block);
				// такая конструкция позволяет как делать функцию универсальной, тоесть и для создаваемого блока и блока из хранилища
				// так и позволяет получать доступ к интервалам для их сбрасывания
				interval = leftToWaitRenderer(Block.leftToWait, cd, resultDb);
			} else {
				Block.leftToWait.appendChild(badResult(Block));
			}
		});

		// удалить eventlisteners
		Block.removeBtn.addEventListener('click', (e) => {
			e.preventDefault();
			if (interval !== null) {
				clearInterval(interval);
			}
			root.removeChild(Block.wrapper);
			deletFromLocalStorage(key);
		});

		return Block.wrapper;
	};
}

export default EventBlock;
