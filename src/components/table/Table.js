import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shouldResize} from './helpers';

export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor ($el) {
		super($el, {
			listeners: ['mousedown'],
		});
	}

	onMousedown (event) {
		shouldResize(event) && resizeHandler(this.$root, event);
	}

	toHTML () {
		return createTable(30);
	}
}
