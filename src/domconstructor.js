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

export const generateElement = function (element, content, className = 'default-class') {
	let newElement = document.createElement(element);
	newElement.classList.add(className);
	newElement.textContent = content;
	return newElement;
};

export const generateResultWrapper = function (result, block, interval) {
	let resultContainer = document.createElement('div');
	resultContainer.classList.add('result-container');
	block.startBtn.setAttribute('disabled', true);
	if (result !== null) {
		let secondPre = generateElement('div', 'секунды: ', 'pre_counter');
		let secondDiv = generateElement('div', result.seconds, 'counter');
		let minutesPre = generateElement('div', 'минуты: ', 'pre_counter');
		let minutesDiv = generateElement('div', result.minutes, 'counter');
		let hoursPre = generateElement('div', 'часы: ', 'pre_counter');
		let hoursDiv = generateElement('div', result.hours, 'counter');
		let daysPre = generateElement('div', 'дни: ', 'pre_counter');
		let daysDiv = generateElement('div', result.days, 'counter');
		let mounthsPre = generateElement('div', 'месяцы: ', 'pre_counter');
		let mounthsDiv = generateElement('div', result.mounths, 'counter');
		let dodiv = generateElement('div', 'До', 'do');
		let date = generateElement(
			'div',
			`${block.selectDays.getInstance().value} ${block.selectMounths
				.getInstance()
				.value.substring(0, block.selectMounths.getInstance().value.length - 1)}я ${block.yearInput.value}`,
			'data'
		);
		let left = generateElement('div', 'осталось:', 'left');
		[
			dodiv,
			date,
			left,
			secondPre,
			secondDiv,
			minutesPre,
			minutesDiv,
			hoursPre,
			hoursDiv,
			daysPre,
			daysDiv,
			mounthsPre,
			mounthsDiv,
		].forEach((el) => resultContainer.appendChild(el));
		block.selectDays.getInstance().classList.add('hide');
		block.selectMounths.getInstance().classList.add('hide');
		block.yearInput.classList.add('hide');
		block.startBtn.classList.add('hide');
	} else {
		clearInterval(interval);
		setTimeout(() => {
			block.wait.textContent = '';
			block.startBtn.removeAttribute('disabled');
		}, 1300);
		resultContainer.textContent = 'пора отпустить прошлое!';
	}
	return resultContainer;
};
