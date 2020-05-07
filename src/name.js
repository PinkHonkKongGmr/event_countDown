const Name = function () {
	this.name = {
		get eventName() {
			return this._name;
		},
		set eventName(value) {
			return (this._name = value);
		},
	};

	Object.defineProperty(this.name, '_name', {
		writable: true,
	});
};

export default Name;
