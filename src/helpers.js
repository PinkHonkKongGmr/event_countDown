export const arrayCreator = function (len) {
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(i + 1);
	}
	return arr;
};

export const generateSelectorBlock = function () {
	const wrapper = document.createElement('div');
	wrapper.classList.add('form-group', 'col-md-1');
	return wrapper;
};

export const generateSelector = function (disableStatus) {
	const selectorDays = document.createElement('select');
	selectorDays.classList.add('form-control');
	selectorDays.setAttribute(disableStatus, true);
	return selectorDays;
};

export const generateOptions = function (option, el) {
	let newElement = document.createElement(option);
	newElement.textContent = el;
	return newElement;
};
