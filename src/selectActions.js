import { generateElement } from './helpers';

class selectActions {
	constructor(selector) {
		this.select = selector;
	}

	clearContent() {
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
