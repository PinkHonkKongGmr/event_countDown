import EventBlock from './eventblock';
import RenderEventBlockFromLocalStorage from './fromLocalStorage';

const root = document.getElementById('root');
const addBtn = document.getElementById('add');
const eventsInLocalStorage = JSON.parse(localStorage.getItem('eventsTest2'));

addBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const eventBlock = new EventBlock(root);
	const newBlock = eventBlock.createBlock();
	root.appendChild(newBlock);
});

for (let key in eventsInLocalStorage) {
	root.appendChild(new RenderEventBlockFromLocalStorage(eventsInLocalStorage[key], root).render());
}
