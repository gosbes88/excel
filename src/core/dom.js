class Dom {
	constructor (selector) {
		this.$el = typeof selector === 'string'
			? document.querySelector(selector)
			: selector;
	}

	html (html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}
		return this.$el.outerHTML.trim();
	}

	append (node) {
		node instanceof Dom && (node = node.$el);
		if (Element.prototype.append) {
			this.$el.append(node);
		} else {
			this.$el.appendChild(node);
		}
	}

	clear () {
		this.html('');
		return this;
	}

	on (eventName, callback) {
		this.$el.addEventListener(eventName, callback);
	}

	off (eventName, callback) {
		this.$el.removeEventListener(eventName, callback);
	}
}

export function $ (selector) {
	return new Dom(selector);
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);
	classes && el.classList.add(classes);
	return $(el);
};
