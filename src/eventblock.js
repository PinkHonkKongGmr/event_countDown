import Mounths from './mounths';
import { arrayCreator } from './helpers';
import { generateSelectorBlock, disableBtn, generateResultWrapper, hideControlElements, badResult } from './domlib';
import CountDown from './countdown';
import timeFormatter from './timeFormatter';
import ResultDb from './resultDB';

function EventBlock() {
	let resultDb = new ResultDb().db;
	let interval = null;
	const Block = generateSelectorBlock();
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
			if (timeFormatter(cd.getDifferance()) !== null) {
				resultDb.date = cd.getDate();
				localStorage.setItem('db', JSON.stringify(resultDb));
				hideControlElements(Block);
				interval = setInterval(() => {
					// для того, чтобы мы могли стилизовать вывод красиво
					Block.wait.innerHTML = '';
					Block.wait.appendChild(generateResultWrapper(timeFormatter(cd.getDifferance()), Block, resultDb));
				}, 100);
			} else {
				Block.wait.appendChild(badResult(Block));
			}
		});

		return Block.wrapper;
	};

	this.deleteBlock = (deleteFunction) => {
		// удалить eventlisteners
		Block.removeBtn.addEventListener('click', (e) => {
			e.preventDefault();
			if (interval !== null) {
				clearInterval(interval);
			}
			deleteFunction();
		});
	};
}

export default EventBlock;
