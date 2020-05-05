import Db from './db';
import selectActions from './selectActions';
import Year from './year';
import { arrayCreator } from './helpers';

const yearInput = document.getElementById('inputYear');
const mounthSelector = document.getElementById('inputMounths');
const selectDays = new selectActions(document.getElementById('inputDays'));
const selectMounths = new selectActions(mounthSelector);

yearInput.value = Year.year;

const renderDays = (val) => {
	if (val.length > 0) {
		for (let key in Db) {
			if (Db[key].name === val) {
				selectDays.addOptions(arrayCreator(Db[key].daysPerMounth(Year.leap)));
				selectDays.switchDisable();
			}
		}
	}
};

yearInput.addEventListener('input', (e) => {
	Year.year = e.target.value;
	renderDays(mounthSelector.value);
});

mounthSelector.addEventListener('change', (e) => renderDays(e.target.value));
selectMounths.addOptions(Object.entries(Db).map((mounth) => mounth[1].name));
