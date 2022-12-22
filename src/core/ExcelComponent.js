import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
	constructor ($el, options) {
		super($el, options?.listeners);
		this.name = options?.name || '';
		this.emitter = options?.emitter;
		this.store = options?.store;
		this.subscribe = options?.subscribe || [];
		this.storeSub = null;
		this.unsubs = [];
		this.prepare();
	}

	$on (event, callback) {
		const subscribe = this.emitter.subscribe(event, callback);
		this.unsubs.push(subscribe);
	}

	$dispatch (action) {
		this.store.dispatch(action);
	}

	storeChanged () {}

	isWatching (key) {
		return this.subscribe.includes(key);
	}

	$emit (event, ...args) {
		this.emitter.emit(event, ...args);
	}

	prepare () {}

	toHTML () {
		return '';
	}

	init () {
		this.initDOMListeners();
	}

	destroy () {
		this.removeDOMListeners();
		this.unsubs.forEach(unsub => unsub());
		this.unsubs = [];
	}
}
