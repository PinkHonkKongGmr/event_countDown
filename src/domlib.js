import selectActions from './selectActions';
import Mounths from './mounths';
import timeFormatter from './timeFormatter';

// эти переменные здесь потому что из них подтягиваются
//  дефолтные значения для соответсвующих инпутов
import Year from './year';
import Time from './time';

export const generateElement = function (element, content, ...classes) {
	let newElement = document.createElement(element);
	classes.forEach((className) => newElement.classList.add(className));
	newElement.textContent = content;
	return newElement;
};

export const generateSelectorBlock = function () {
	const yearInstance = new Year().year;
	const eventTime = new Time().eventTime;

	const wrapper = generateElement('div', null, 'form-row', 'form-group', 'event-box');

	const startBtn = generateElement('button', 'Запуск', 'btn', 'btn-primary');
	startBtn.disabled = true;

	const startBtnEnableController = () => {
		if (nameInput.value.trim().length > 0 && selectDays.getInstance().value.length > 0) {
			startBtn.disabled = false;
		} else {
			startBtn.disabled = true;
		}
	};

	const removeBtn = generateElement('button', 'Удолить', 'btn', 'btn-primary');

	const leftToWait = generateElement('div', null, 'result');

	const nameInput = generateElement('input', null, 'form-control');

	const fieldWrapper = generateElement('div', null, 'feildset-custom', 'form-row', 'form-group');

	const nameWrapper = generateElement('div', 'Название события', 'name_wrapper', 'form-group', 'col-md-12');

	nameWrapper.appendChild(nameInput);

	const selectDays = new selectActions(generateElement('select', null, 'form-control'));
	const selectMounths = new selectActions(generateElement('select', null, 'form-control'));

	const dayWrapper = generateElement('div', null, 'form-group', 'col-md-1');
	dayWrapper.appendChild(selectDays.getInstance());

	const mounthWrapper = generateElement('div', null, 'form-group', 'col-md-8');
	mounthWrapper.appendChild(selectMounths.getInstance());

	const yearInput = generateElement('input', null, 'form-control');
	yearInput.setAttribute('type', 'number');
	yearInput.value = yearInstance.year;

	const yearWrapper = generateElement('div', null, 'form-group', 'col-md-3');
	yearWrapper.appendChild(yearInput);

	const timeInput = generateElement('input', null, 'form-control');
	timeInput.setAttribute('type', 'time');
	timeInput.disabled = true;

	timeInput.value = eventTime.time;

	const needTimeController = generateElement('label', null, 'switch');
	const needTimeCheckBox = document.createElement('input');
	needTimeCheckBox.setAttribute('type', 'checkbox');
	const needTimeSwitchSpan = generateElement('span', null, 'slider', 'round');
	[needTimeCheckBox, needTimeSwitchSpan].forEach((el) => needTimeController.appendChild(el));

	const timeWrapper = generateElement('div', null, 'form-group', 'col-md-3');
	timeWrapper.appendChild(timeInput);

	[nameWrapper, dayWrapper, mounthWrapper, yearWrapper, timeWrapper, needTimeController].forEach((child) =>
		fieldWrapper.appendChild(child)
	);
	[fieldWrapper, startBtn, removeBtn, leftToWait].forEach((child) => wrapper.appendChild(child));

	return {
		eventTime,
		fieldWrapper,
		yearInstance,
		selectDays,
		selectMounths,
		nameInput,
		yearInput,
		timeInput,
		needTimeCheckBox,
		startBtn,
		removeBtn,
		leftToWait,
		wrapper,
		startBtnEnableController,
	};
};

export const disableBtn = function (block) {
	block.startBtn.setAttribute('disabled', true);
};

export const leftToWaitRenderer = function (leftToWait, cd, db) {
	let interval = setInterval(() => {
		if (cd.getDifferance() < 1100) {
			leftToWait.innerHTML = `Событие ${db.name} завершено`;
			clearInterval(interval);
			return;
		}
		leftToWait.innerHTML = '';
		leftToWait.appendChild(generateResultWrapper(timeFormatter(cd.getDifferance()), db));
	}, 100);
	return interval;
};

export const generateResultWrapper = function (result, rdb) {
	if (result !== null) {
		let resultContainer = generateElement('div', null, 'result-container');

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
		let timebox = generateElement('div', rdb.time, 'time');
		let eventNameBox = generateElement('div', rdb.name, 'event_name');
		let dodiv = generateElement('div', 'До события', 'do');
		let date = generateElement(
			'div',
			`${rdb.day} ${Mounths.mounths[`${Mounths.getKey(rdb.mounth)}`].genetive}  ${rdb.year}`,
			'data'
		);
		let left = generateElement('div', 'осталось:', 'left');

		if (!rdb.needTime) {
			timebox.classList.add('hide');
		}
		// заменить foreach обычным циклом?ибо он тяжеловесный
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

		return resultContainer;
	} else return generateElement('div', `Событие ${rdb.name} завершено`);
};

export const hideControlElements = function (block) {
	[block.fieldWrapper, block.startBtn].forEach((el) => el.classList.add('hide'));
};

export const badResult = function (block) {
	let resultContainer = generateElement('div', null, 'result-container');
	setTimeout(() => {
		block.leftToWait.textContent = '';
		block.startBtn.removeAttribute('disabled');
	}, 1300);
	resultContainer.textContent = 'пора отпустить прошлое!';

	return resultContainer;
};

export const generateLcWrapper = function () {
	let wrapper = generateElement('div', null, 'form-row', 'form-group', 'event-box');
	let deleteBtn = generateElement('button', 'Удолить', 'btn', 'btn-primary');
	const leftToWait = generateElement('div', '', 'result');
	wrapper.appendChild(deleteBtn);
	wrapper.appendChild(leftToWait);

	return { wrapper, deleteBtn, leftToWait };
};
