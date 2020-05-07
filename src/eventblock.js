import Mounths from './mounths';
import { arrayCreator } from './helpers';
import { generateSelectorBlock, generateResultWrapper } from './domconstructor';
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
			Block.name.eventName = e.target.value.trim();
			Block.startBtnEnableController();
		});

		Block.yearInput.addEventListener('input', (e) => {
			if (!e.target.value.match(/[^0-9]/)) {
				Block.yearInstance.year = e.target.value.trim();
				activateController(Block.selectMounths.getInstance().value);
			}
		});

		Block.timeInput.addEventListener('input', (e) => {
			Block.eventTime.time = e.target.value;
			Block.eventTime.needTime = true;
		});

		Block.needTimeCheckBox.addEventListener('change', () => {
			Block.timeInput.disabled = !Block.timeInput.disabled;
			Block.eventTime.needTime = !Block.eventTime.needTime;
		});

		Block.selectMounths.getInstance().addEventListener('change', (e) => activateController(e.target.value));
		Block.selectMounths.addOptions(Object.entries(Mounths.mounths).map((mounth) => mounth[1].name));

		Block.startBtn.addEventListener('click', (e) => {
			e.preventDefault();
			resultDb.day = Block.selectDays.getInstance().value;
			resultDb.mounth = Mounths.getKey(Block.selectMounths.getInstance().value);
			resultDb.year = Block.yearInstance.year;
			resultDb.time = Block.eventTime.time;
			resultDb.name = Block.name.eventName;
			let cd = new CountDown(resultDb);
			if (timeFormatter(cd.getDate()) !== null) {
				localStorage.setItem('db', JSON.stringify(resultDb));
			}
			interval = setInterval(() => {
				// для того, чтобы мы могли стилизовать вывод красиво
				Block.wait.innerHTML = '';
				Block.wait.appendChild(generateResultWrapper(timeFormatter(cd.getDate()), Block, interval));
			}, 100);
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
