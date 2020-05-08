import CountDown from './countdown';
import { leftToWaitRenderer } from './domlib';

function RenderEventBlockFromLocalStorage(fromLc, root) {
	let wrapper = document.createElement('div');
	let deleteBtn = document.createElement('button');
	deleteBtn.classList.add('btn', 'btn-primary');
	let leftToWait = document.createElement('div');

	let interval = null;
	let cd = new CountDown(fromLc);

	deleteBtn.addEventListener('click', (e) => {
		e.preventDefault();
		root.removeChild(wrapper);
		clearInterval(interval);
	});

	wrapper.appendChild(leftToWait);
	wrapper.appendChild(deleteBtn);

	this.render = () => {
		interval = leftToWaitRenderer(leftToWait, cd, fromLc);
		return wrapper;
	};
}

export default RenderEventBlockFromLocalStorage;
