import Mounths from './mounths';
import { arrayCreator } from './helpers';
import { generateSelectorBlock, generateResultWrapper } from './domconstructor';
import CountDown from './countdown';
import timeFormatter from './timeFormatter';

function EventBlock() {
	let interval = null;
	const Block = generateSelectorBlock();
	this.createBlock = () => {
		const renderDays = (val) => {
			if (val.length > 0) {
				Block.selectDays.clearContent();
				Block.selectDays.addOptions(
					arrayCreator(Mounths.getMounth(val).daysPerMounth(Block.yearInstance.leap))
				);
				Block.selectDays.enable();
			}
		};

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

		Block.selectMounths.getInstance().addEventListener('change', (e) => activateController(e.target.value));
		Block.selectMounths.addOptions(Object.entries(Mounths.mounths).map((mounth) => mounth[1].name));

		Block.startBtn.addEventListener('click', (e) => {
			e.preventDefault();
			let cd = new CountDown(
				Block.selectDays.getInstance().value,
				Mounths.getKey(Block.selectMounths.getInstance().value),
				Block.yearInstance.year
			);

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
