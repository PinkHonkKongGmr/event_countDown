import Mounths from './mounths';
import { arrayCreator } from './helpers';
import { generateSelectorBlock, generateResultWrapper } from './domconstructor';
import CountDown from './countdown';
import timeFormatter from './timeFormatter';

function EventBlock() {
	this.interval = null;
	this.createBlock = () => {
		const Block = generateSelectorBlock();

		const renderDays = (val) => {
			if (val.length > 0) {
				Block.selectDays.addOptions(
					arrayCreator(Mounths.getMounth(val).daysPerMounth(Block.yearInstance.leap))
				);
				Block.selectDays.switchDisable();
			}
		};

		Block.yearInput.addEventListener('input', (e) => {
			Block.yearInstance.year = e.target.value;
			renderDays(Block.selectMounths.getInstance().value);
		});

		Block.selectMounths.getInstance().addEventListener('change', (e) => renderDays(e.target.value));
		Block.selectMounths.addOptions(Object.entries(Mounths.mounths).map((mounth) => mounth[1].name));

		Block.startBtn.addEventListener('click', (e) => {
			e.preventDefault();
			let cd = new CountDown(
				Block.selectDays.getInstance().value,
				Mounths.getKey(Block.selectMounths.getInstance().value),
				Block.yearInstance.year
			);

			this.interval = setInterval(() => {
				Block.wait.innerText = generateResultWrapper(
					timeFormatter(cd.getDate()),
					Block.wait,
					Block.startBtn,
					this.interval
				);
			}, 100);
		});

		return Block.wrapper;
	};
}

export default EventBlock;
