export class Page {
	constructor (params) {
		this.params = params;
	}

	getRoot () {
		throw new Error('no child method getRoot');
	}

	afterRender () {}

	destroy () {}
}
