import selectActions from './selectActions';
import Name from './name';
import Year from './year';
import Time from './time';

export const generateSelectorBlock = function () {
	const name = new Name().name;
	const yearInstance = new Year().year;
	const eventTime = new Time().eventTime;

	const wrapper = document.createElement('div');
	wrapper.classList.add('form-row', 'form-group', 'event-box');

	const startBtn = document.createElement('button');
	startBtn.classList.add('btn', 'btn-primary');
	startBtn.textContent = 'Запуск';
	startBtn.disabled = true;

	const startBtnEnableController = () => {
		if (nameInput.value.trim().length > 0 && selectDays.getInstance().value.length > 0) {
			startBtn.disabled = false;
		} else {
			startBtn.disabled = true;
		}
	};

	const removeBtn = document.createElement('button');
	removeBtn.classList.add('btn', 'btn-primary');
	removeBtn.textContent = 'Удолить';

	const wait = generateElement('div', '', 'result');

	const nameInput = document.createElement('input');
	nameInput.classList.add('form-control');

	const fieldWrapper = generateElement('div', '', 'feildset-custom');
	fieldWrapper.classList.add('form-row', 'form-group');

	const nameWrapper = generateElement('div', 'Название события');
	nameWrapper.classList.add('form-group', 'col-md-12');
	nameWrapper.appendChild(nameInput);

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

	const timeInput = document.createElement('input');
	timeInput.classList.add('form-control');
	timeInput.setAttribute('type', 'time');
	timeInput.value = '00:00';

	const timeWrapper = document.createElement('div');
	yearWrapper.classList.add('form-group', 'col-md-3');
	timeWrapper.appendChild(timeInput);

	[nameWrapper, dayWrapper, mounthWrapper, yearWrapper, timeWrapper].forEach((child) =>
		fieldWrapper.appendChild(child)
	);
	[fieldWrapper, startBtn, removeBtn, wait].forEach((child) => wrapper.appendChild(child));

	return {
		name,
		eventTime,
		fieldWrapper,
		yearInstance,
		selectDays,
		selectMounths,
		nameInput,
		yearInput,
		timeInput,
		startBtn,
		removeBtn,
		wait,
		wrapper,
		startBtnEnableController,
	};
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
		let timebox = generateElement('div', block.eventTime.time, 'time');
		let eventNameBox = generateElement('div', block.name.eventName, 'event_name');
		let dodiv = generateElement('div', 'До события', 'do');
		let date = generateElement(
			'div',
			`${block.selectDays.getInstance().value} ${block.selectMounths
				.getInstance()
				.value.substring(0, block.selectMounths.getInstance().value.length - 1)}я ${block.yearInput.value}`,
			'data'
		);
		let left = generateElement('div', 'осталось:', 'left');

		if (!block.eventTime.needTime) {
			timebox.classList.add('hide');
		}
		[
			dodiv,
			eventNameBox,
			date,
			timebox,
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

		[block.fieldWrapper, block.startBtn].forEach((el) => el.classList.add('hide'));
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
