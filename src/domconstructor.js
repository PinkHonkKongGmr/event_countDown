import selectActions from './selectActions';
import Year from './year';

export const generateSelectorBlock = function () {
	const yearInstance = new Year().year;

	const wrapper = document.createElement('div');
	wrapper.classList.add('form-row', 'form-group');

	const startBtn = document.createElement('button');
	startBtn.classList.add('btn', 'btn-primary');
	startBtn.textContent = 'Запуск';

	const wait = document.createElement('div');

	const selectDays = new selectActions(generateSelector('disabled'));
	const selectMounths = new selectActions(generateSelector('enabled'));

	const dayWrapper = document.createElement('div');
	dayWrapper.classList.add('form-group', 'col-md-1');
	dayWrapper.appendChild(selectDays.getInstance());

	const mounthWrapper = document.createElement('div');
	mounthWrapper.classList.add('form-group', 'col-md-8');
	mounthWrapper.appendChild(selectMounths.getInstance());

	const yearInput = document.createElement('input');
	yearInput.classList.add('form-control');
	yearInput.setAttribute('type', 'number');
	yearInput.value = yearInstance.year;

	const yearWrapper = document.createElement('div');
	yearWrapper.classList.add('form-group', 'col-md-3');
	yearWrapper.appendChild(yearInput);

	[dayWrapper, mounthWrapper, yearWrapper, startBtn, wait].forEach((child) => wrapper.appendChild(child));

	return { yearInstance, selectDays, selectMounths, yearInput, startBtn, wait, wrapper };
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

export const generateResultWrapper = function (result, block, btn, interval) {
	btn.setAttribute('disabled', true);
	if (result !== null) {
		let resultContainer = document.createElement('div');
		positiveResult.textContent = 'урра';
		return positiveResult;
	} else {
		setTimeout(() => {
			block.textContent = '';
			btn.removeAttribute('disabled');
			clearInterval(interval);
		}, 1300);
		return 'пора попрощаться с прошлым!';
	}
};