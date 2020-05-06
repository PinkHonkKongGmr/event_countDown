import EventBlock from './eventblock';

const root = document.getElementById('root');

const eb = new EventBlock();
const eb2 = new EventBlock();
const newel = eb.createBlock();
const newel2 = eb2.createBlock();
root.appendChild(newel);
root.appendChild(newel2);
