import { generateOptions } from './helpers';

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
			this.select.appendChild(generateOptions('option', el));
		});
	}

	switchDisable() {
		this.select.disabled = false;
	}
}

export default selectActions;
