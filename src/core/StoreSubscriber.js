import {isEqual} from './utils';

export class StoreSubscriber {
	constructor (store) {
		this.store = store;
		this.sub = null;
		this.prevState = {};
	}

	subscribeComponents (components) {
		this.prevState = this.store.getState();
		this.sub = this.store.subscribe(state => {
			Object.keys(state).forEach(key => {
				if (!isEqual(this.prevState[key], state[key])) {
					components.forEach(comp => {
						if (comp.isWatching(key)) {
							const changes = {[key]: state[key]};
							comp.storeChanged(changes);
						}
					});
				}
			});
			this.prevState = this.store.getState();
		});
	}

	subscribeFromStore () {
		this.sub.unsubscribe();
	}
}
