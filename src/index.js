import Mounths from './mounths';
import selectActions from './selectActions';
import Year from './year';
import { arrayCreator } from './helpers';
import CountDown from './countdown';
import timeFormatter from './timeFormatter';

const startBtn = document.getElementById('start');
const yearInput = document.getElementById('inputYear');
const selectDays = new selectActions(document.getElementById('inputDays'));
const selectMounths = new selectActions(document.getElementById('inputMounths'));

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
	// console.log(selectDays.getInstance().value, Mounths.getKey(selectMounths.getInstance().value), Year.year);
	let cd = new CountDown(
		selectDays.getInstance().value,
		Mounths.getKey(selectMounths.getInstance().value),
		Year.year
	);
	document.getElementById('wait').innerText = timeFormatter(cd.getDate());
});
