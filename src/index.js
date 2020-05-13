import EventBlock from './modules/eventblock';
import RenderEventBlockFromLocalStorage from './modules/fromLocalStorage';
import './style/style.scss';

const root = document.getElementById('root');
const addBtn = document.getElementById('add');
const eventsInLocalStorage = JSON.parse(localStorage.getItem('__events__'));

addBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const eventBlock = new EventBlock(root);
	const newBlock = eventBlock.createBlock();
	root.appendChild(newBlock);
});

for (let key in eventsInLocalStorage) {
	root.appendChild(new RenderEventBlockFromLocalStorage(eventsInLocalStorage[key], root).render());
}
