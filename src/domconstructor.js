import selectActions from './selectActions';
import Year from './year';

export const generateSelectorBlock = function () {
	const wrapper = document.createElement('div');
	const startBtn = document.createElement('button');
	startBtn.classList.add('btn', 'btn-primary');

	const yearInput = document.createElement('input');
	yearInput.classList.add('form-control');
	yearInput.setAttribute('type', 'number');
	yearInput.value = Year.year;

	const wait = document.createElement('div');

	const selectDays = new selectActions(generateSelector('disabled'));
	const selectMounths = new selectActions(generateSelector('enabled'));

	const dayWrapper = document.createElement('div').appendChild(selectDays.getInstance());
	dayWrapper.classList.add('form-group', 'col-md-1');

	const mounthWrapper = document.createElement('div').appendChild(selectMounths.getInstance());
	mounthWrapper.classList.add('form-group', 'col-md-8');
	wrapper.classList.add('form-group');
	[dayWrapper, mounthWrapper, yearInput, startBtn, wait].forEach((child) => wrapper.appendChild(child));

	return { selectDays, selectMounths, yearInput, startBtn, wait, wrapper };
};

export const generateSelector = function (disableStatus) {
	const selectorDays = document.createElement('select');
	selectorDays.classList.add('form-control');
	selectorDays.setAttribute(disableStatus, true);
	return selectorDays;
};

export const generateOptions = function (option, content) {
	let newElement = document.createElement(option);
	newElement.textContent = content;
	return newElement;
};
