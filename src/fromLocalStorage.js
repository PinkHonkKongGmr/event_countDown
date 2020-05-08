import CountDown from './countdown';
import { generateLcWrapper, leftToWaitRenderer } from './domlib';
import { deletFromLocalStorage } from './helpers';

function RenderEventBlockFromLocalStorage(fromLc, root) {
	let Block = generateLcWrapper();
	let interval = null;
	let cd = new CountDown(fromLc);

	Block.deleteBtn.addEventListener('click', (e) => {
		e.preventDefault();
		root.removeChild(Block.wrapper);
		clearInterval(interval);
		deletFromLocalStorage(fromLc.key);
	});

	this.render = () => {
		interval = leftToWaitRenderer(Block.leftToWait, cd, fromLc);
		return Block.wrapper;
	};
}

export default RenderEventBlockFromLocalStorage;
