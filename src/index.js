import EventBlock from './eventblock';

const root = document.getElementById('root');
const addBtn = document.getElementById('add');

const deleteBlock = (block) => root.removeChild(block);

addBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const eventBlock = new EventBlock();
	const newBlock = eventBlock.createBlock();
	root.appendChild(newBlock);
	const deleteBlockBind = deleteBlock.bind(null, newBlock);
	eventBlock.deleteBlock(deleteBlockBind);
});

console.log(JSON.parse(localStorage.getItem('db')));
