import Mounths from './mounths';
import { arrayCreator, deletFromLocalStorage } from './helpers';
import DataEngine from './dataEngine';

function EventBlock(root) {
	const dataEngine = new DataEngine();
	const Block = dataEngine.Block;
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
		Block.selectMounths.addOptions(Object.entries(Mounths.mounths).map((mounth) => mounth[1].name));

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

		const removeBtnHandler = (e) => {
			e.preventDefault();
			dataEngine.stopInterval();
			root.removeChild(Block.wrapper);
			deletFromLocalStorage(key);
			Block.nameInput.removeEventListener('input', dataEngine.nameInputHandler);
			Block.yearInput.removeEventListener('input', yearInputHandler);
			Block.timeInput.removeEventListener('input', dataEngine.timeInputHandler);
			Block.needTimeCheckBox.removeEventListener('change', dataEngine.needTimeCheckBoxHandler);
			Block.selectDays.getInstance().removeEventListener('change', dataEngine.dayInputHandler);
			Block.selectMounths.getInstance().removeEventListener('change', mouthInputHandler);
			Block.startBtn.removeEventListener('click', dataEngine.startBtnhandler);
			Block.removeBtn.removeEventListener('click', removeBtnHandler);
		};

		Block.nameInput.addEventListener('input', dataEngine.nameInputHandler);
		Block.yearInput.addEventListener('input', yearInputHandler);
		Block.timeInput.addEventListener('input', dataEngine.timeInputHandler);
		Block.needTimeCheckBox.addEventListener('change', dataEngine.needTimeCheckBoxHandler);
		Block.selectDays.getInstance().addEventListener('change', dataEngine.dayInputHandler);
		Block.selectMounths.getInstance().addEventListener('change', mouthInputHandler);
		Block.startBtn.addEventListener('click', dataEngine.startBtnhandler);
		Block.removeBtn.addEventListener('click', removeBtnHandler);

		return Block.wrapper;
	};
}

export default EventBlock;
