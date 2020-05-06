import { generateElement } from './domconstructor';

class selectActions {
	constructor(selector) {
		this.select = selector;
	}

	getInstance() {
		return this.select;
	}

	clearContent() {
		console.log('clreared');
		this.select.innerHTML = '';
	}

	addOptions(options) {
		options.forEach((el) => {
			this.select.appendChild(generateElement('option', el));
		});
	}

	switchDisable() {
		this.select.disabled = false;
	}
}

export default selectActions;
