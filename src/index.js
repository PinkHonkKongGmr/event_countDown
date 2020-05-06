import EventBlock from './eventblock';

const root = document.getElementById('root');

function deleteBlock(block) {
	root.removeChild(block);
}

const eb = new EventBlock();
const eb2 = new EventBlock();
const newel = eb.createBlock();
const newel2 = eb2.createBlock();
root.appendChild(newel);
root.appendChild(newel2);

const deleteBlockBind1 = deleteBlock.bind(null, newel);
const deleteBlockBind2 = deleteBlock.bind(null, newel2);
eb.deleteBlock(deleteBlockBind1);
eb2.deleteBlock(deleteBlockBind2);
