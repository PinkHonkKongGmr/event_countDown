import { deletFromLocalStorage } from './helpers';
import DataEngine from './dataEngine';

function EventBlock(root) {
	const dataEngine = new DataEngine();
	const Block = dataEngine.Block;
	const key = dataEngine.resultDb.key;
	this.createBlock = () => {
		const removeBtnHandler = (e) => {
			e.preventDefault();
			dataEngine.stopInterval();
			root.removeChild(Block.wrapper);
			deletFromLocalStorage(key);
			Block.nameInput.removeEventListener('input', dataEngine.nameInputHandler);
			Block.yearInput.removeEventListener('input', dataEngine.yearInputHandler);
			Block.timeInput.removeEventListener('input', dataEngine.timeInputHandler);
			Block.needTimeCheckBox.removeEventListener('change', dataEngine.needTimeCheckBoxHandler);
			Block.selectDays.getInstance().removeEventListener('change', dataEngine.dayInputHandler);
			Block.selectMounths.getInstance().removeEventListener('change', dataEngine.mouthInputHandler);
			Block.startBtn.removeEventListener('click', dataEngine.startBtnhandler);
			Block.removeBtn.removeEventListener('click', removeBtnHandler);
		};

		Block.nameInput.addEventListener('input', dataEngine.nameInputHandler);
		Block.yearInput.addEventListener('input', dataEngine.yearInputHandler);
		Block.timeInput.addEventListener('input', dataEngine.timeInputHandler);
		Block.needTimeCheckBox.addEventListener('change', dataEngine.needTimeCheckBoxHandler);
		Block.selectDays.getInstance().addEventListener('change', dataEngine.dayInputHandler);
		Block.selectMounths.getInstance().addEventListener('change', dataEngine.mouthInputHandler);
		Block.startBtn.addEventListener('click', dataEngine.startBtnhandler);
		Block.removeBtn.addEventListener('click', removeBtnHandler);

		return Block.wrapper;
	};
}

export default EventBlock;
