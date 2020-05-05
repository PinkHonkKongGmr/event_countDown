import EventBlock from './eventblock';

const root = document.getElementById('root');

const eb = new EventBlock();
const newel = eb.createBlock();
root.appendChild(newel);
