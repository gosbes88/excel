import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {createToolbar} from './toolbar.template';
import {$} from '@core/dom';
import {defaultStyles} from '@/constants';

export class Toolbar extends ExcelStateComponent {
	constructor ($el, options) {
		super($el, {
			name: 'Toolbar',
			listeners: ['click'],
			subscribe: ['currentStyles'],
			...options,
		});
	}

	static className = 'excel__toolbar';

	onClick (event) {
		const $target = $(event.target);
		if ($target.data.type === 'button') {
			const val = JSON.parse($target.data.value);
			this.$emit('toolbar:applyStyle', val);
		}
	}

	prepare () {
		this.initState(defaultStyles);
	}

	get template () {
		return createToolbar(this.state);
	}

	toHTML () {
		return this.template;
	}

	storeChanged (changes) {
		this.setState(changes.currentStyles);
	}
}
