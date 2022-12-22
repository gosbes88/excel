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

	text (text) {
		if (typeof text !== 'undefined') {
			this.$el.textContent = text;
			return this;
		}
		return this.$el.tagName.toUpperCase() === 'input'
			? this.$el.value.trim()
			: this.$el.textContent.trim();
	}

	append (node) {
		node instanceof Dom && (node = node.$el);
		if (Element.prototype.append) {
			this.$el.append(node);
		} else {
			this.$el.appendChild(node);
		}
	}

	closest (selector) {
		return $(this.$el.closest(selector));
	}

	getCoords () {
		return this.$el.getBoundingClientRect();
	}

	get data () {
		return this.$el.dataset
	}

	css (styles = {}) {
		Object
			.entries(styles)
			.forEach(([key, value]) => {
				this.$el.style[key] = value;
			});
	}

	getStyles (styles = []) {
		return styles.reduce((res, s) => {
			res[s] = this.$el.style[s];
			return res;
		}, {});
	}

	findAll (selector) {
		return this.$el.querySelectorAll(selector);
	}

	find (selector) {
		return $(this.$el.querySelector(selector));
	}

	addClass (name) {
		this.$el.classList.add(name);
		return this;
	}

	removeClass (name) {
		this.$el.classList.remove(name);
		return this;
	}

	id (parse) {
		if (parse) {
			const parsed = this.id().split(':');
			return {
				row: +parsed[0],
				col: +parsed[1],
			};
		}
		return this.data.id;
	}

	focus () {
		this.$el.focus();
		return this;
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

	attr (name, value) {
		if (value) {
			this.$el.setAttribute(name, value);
			return this;
		}
		return this.$el.getAttribute(name);
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
