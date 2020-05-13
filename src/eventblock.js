import DataEngine from './dataEngine';

function EventBlock(root) {
	this.createBlock = () => {
		const dataEngine = new DataEngine(root);
		const Block = dataEngine.Block;
		dataEngine.eventBindler();
		return Block.wrapper;
	};
}

export default EventBlock;
