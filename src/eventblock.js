import Mounths from './mounths';
import selectActions from './selectActions';
import Year from './year';
import { arrayCreator, generateSelector, generateSelectorBlock } from './helpers';
import CountDown from './countdown';
import timeFormatter from './timeFormatter';

class EventBlock {
	createBlock() {
		const Block = generateSelectorBlock();
		const startBtn = document.createElement('button');
		startBtn.classList.add('btn', 'btn-primary');
		const yearInput = document.createElement('input');
		yearInput.classList.add('form-control');
		yearInput.setAttribute('type', 'number');
		const selectDays = new selectActions(generateSelector('disabled'));
		const selectMounths = new selectActions(generateSelector('enabled'));
		const wait = document.createElement('div');

		Block.appendChild(selectDays.getInstance());
		Block.appendChild(selectMounths.getInstance());
		Block.appendChild(yearInput);
		Block.appendChild(startBtn);
		Block.appendChild(wait);

		yearInput.value = Year.year;

		const renderDays = (val) => {
			if (val.length > 0) {
				selectDays.addOptions(arrayCreator(Mounths.getMounth(val).daysPerMounth(Year.leap)));
				selectDays.switchDisable();
			}
		};

		yearInput.addEventListener('input', (e) => {
			Year.year = e.target.value;
			renderDays(selectMounths.getInstance().value);
		});

		selectMounths.getInstance().addEventListener('change', (e) => renderDays(e.target.value));
		selectMounths.addOptions(Object.entries(Mounths.mounths).map((mounth) => mounth[1].name));

		startBtn.addEventListener('click', (e) => {
			e.preventDefault();
			let cd = new CountDown(
				selectDays.getInstance().value,
				Mounths.getKey(selectMounths.getInstance().value),
				Year.year
			);

			setInterval(() => {
				wait.innerText = timeFormatter(cd.getDate());
			}, 100);
		});

		return Block;
	}
}

export default EventBlock;
