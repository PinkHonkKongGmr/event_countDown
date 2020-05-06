import selectActions from './selectActions';
import Year from './year';

export const generateSelectorBlock = function () {
	const yearInstance = new Year().year;

	const wrapper = document.createElement('div');
	wrapper.classList.add('form-row', 'form-group');

	const startBtn = document.createElement('button');
	startBtn.classList.add('btn', 'btn-primary');
	startBtn.textContent = 'Запуск';

	const removeBtn = document.createElement('button');
	removeBtn.classList.add('btn', 'btn-primary');
	removeBtn.textContent = 'Удолить';

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

	[dayWrapper, mounthWrapper, yearWrapper, startBtn, removeBtn, wait].forEach((child) => wrapper.appendChild(child));

	return { yearInstance, selectDays, selectMounths, yearInput, startBtn, removeBtn, wait, wrapper };
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
	let resultContainer = document.createElement('div');
	btn.setAttribute('disabled', true);
	if (result !== null) {
		resultContainer.textContent = result.seconds;
	} else {
		clearInterval(interval);
		setTimeout(() => {
			block.textContent = '';
			btn.removeAttribute('disabled');
		}, 1300);
		resultContainer.textContent = 'пора отпустить прошлое!';
	}
	return resultContainer;
};
