import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
	constructor ($el, options) {
		super($el, options?.listeners);
		this.name = options?.name || '';
	}

	toHTML () {
		return '';
	}

	init () {
		this.initDOMListeners();
	}

	destroy () {
		this.removeDOMListeners();
	}
}
