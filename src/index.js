import EventBlock from './eventblock';
import RenderEventBlockFromLocalStorage from './fromLocalStorage';

const root = document.getElementById('root');
const addBtn = document.getElementById('add');

addBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const eventBlock = new EventBlock(root);
	const newBlock = eventBlock.createBlock();
	root.appendChild(newBlock);
});

let renderEventBlockFromLocalStorage = new RenderEventBlockFromLocalStorage(
	JSON.parse(localStorage.getItem('db')),
	root
);

let renderEventBlockFromLocalStorage2 = new RenderEventBlockFromLocalStorage(
	JSON.parse(localStorage.getItem('db')),
	root
);

root.appendChild(renderEventBlockFromLocalStorage.render());
root.appendChild(renderEventBlockFromLocalStorage2.render());
