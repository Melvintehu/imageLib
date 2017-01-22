class Date {
	constructor(data) {
		this.originalData = {};
		this.selected = null;
		this.date = null;

		this.originalData = data;
		for(let field in data) {
			this[field] = data[field];
		}
	}

	displayDate() {

	}

	isSelected() {
		return this.selected != null || this.selected != "";
	}

	data() {
 		let data = Object.assign({}, this);

 		delete data.originalData;
 		delete data.all;

 		return data;
	}
}

export default Date;