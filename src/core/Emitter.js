export class Emitter {
	constructor () {
		this.listeners = {};
	}

	emit (event, ...args) {
		Array.isArray(this.listeners[event]) && this.listeners[event].forEach(callback => callback(...args));
	}

	subscribe (event, callback) {
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(callback);
		return () => {
			this.listeners[event] = this.listeners[event].filter(fn => fn !== callback);
		}
	}

	describe
}
