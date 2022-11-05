import {capitalize} from '@core/utils';

export class DomListener {
	constructor ($root, listeners = []) {
		if (!$root) {
			throw new Error('нет главного элемента');
		}
		this.$root = $root;
		this.listeners = listeners;
	}

	initDOMListeners () {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);
			if (!this[method]) {
				throw new Error(`не задан обработчик "${method}" для события "${listener}" компонента ${this.name}`);
			}
			// так мы закрепляем метод за своим контекстом и можем в итоге удалять обработчик removeEventListener,
			// т.к. без такого присвоения bind вернёт новую функцию, ни к кому не привязанную и к-ю не возможно удалить из памяти
			this[method] = this[method].bind(this);
			this.$root.on(listener, this[method]);
		});
	}

	removeDOMListeners () {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);
			if (!this[method]) {
				throw new Error(`не задан обработчик "${method}" для события "${listener}" компонента ${this.name}`);
			}
			this.$root.off(listener, this[method]);
		});
	}
}

function getMethodName (eventName) {
	return `on${capitalize(eventName)}`;
}
