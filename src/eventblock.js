import Mounths from './mounths';
import { arrayCreator, deletFromLocalStorage } from './helpers';
import DataEngine from './dataEngine';

function EventBlock(root) {
	const dataEngine = new DataEngine();
	const Block = dataEngine.Block;
	let interval = null;
	const key = dataEngine.resultDb.key;
	this.createBlock = () => {
		const renderDays = (val) => {
			if (val.length > 0) {
				Block.selectDays.clearContent();
				Block.selectDays.addOptions(
					arrayCreator(Mounths.getMounth(val).daysPerMounth(Block.yearInstance.leap))
				);
			}
		};

		renderDays(Mounths.mounths.January.name);
		// select.options  по индексу выдает undefined

		const activateController = (days) => {
			renderDays(days);
			Block.startBtnEnableController();
		};

		const mouthInputHandler = (e) => {
			dataEngine.mouthInputHandler(e);
			activateController(dataEngine.resultDb.mounth);
		};

		const yearInputHandler = (e) => {
			dataEngine.yearInputhandler(e);
			activateController(dataEngine.resultDb.mounth);
		};

		const startBtnhandler = (e) => {
			dataEngine.startBtnhandler(e);
			interval = dataEngine.interval;
		};

		Block.nameInput.addEventListener('input', dataEngine.nameInputHandler);

		Block.yearInput.addEventListener('input', yearInputHandler);

		Block.timeInput.addEventListener('input', dataEngine.timeInputHandler);

		Block.needTimeCheckBox.addEventListener('change', dataEngine.needTimeCheckBoxHandler);

		Block.selectDays.getInstance().addEventListener('change', dataEngine.dayInputHandler);

		Block.selectMounths.getInstance().addEventListener('change', mouthInputHandler);
		Block.selectMounths.addOptions(Object.entries(Mounths.mounths).map((mounth) => mounth[1].name));

		Block.startBtn.addEventListener('click', startBtnhandler);

		// удалить eventlisteners
		Block.removeBtn.addEventListener('click', (e) => {
			e.preventDefault();

			if (interval !== null) {
				clearInterval(interval);
			}
			root.removeChild(Block.wrapper);
			deletFromLocalStorage(key);
			Block.nameInput.removeEventListener('input', dataEngine.nameInputHandler);

			Block.yearInput.removeEventListener('input', yearInputHandler);

			Block.timeInput.removeEventListener('input', dataEngine.timeInputHandler);

			Block.needTimeCheckBox.removeEventListener('change', dataEngine.needTimeCheckBoxHandler);

			Block.selectDays.getInstance().removeEventListener('change', dataEngine.dayInputHandler);

			Block.selectMounths.getInstance().removeEventListener('change', mouthInputHandler);

			Block.startBtn.removeEventListener('click', startBtnhandler);
		});

		return Block.wrapper;
	};
}

export default EventBlock;
