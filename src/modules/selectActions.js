import { generateElement } from './domlib';

class selectActions {
	constructor(selector) {
		this.select = selector;
	}

	getInstance() {
		return this.select;
	}

	clearContent() {
		this.select.innerHTML = '';
	}

	addOptions(options) {
		options.forEach((el) => {
			this.select.appendChild(generateElement('option', el));
		});
	}

	enable() {
		this.select.disabled = false;
	}
	disable() {
		this.select.disabled = true;
	}
}

export default selectActions;
