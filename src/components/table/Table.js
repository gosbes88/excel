import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize';
import {shouldResize, isCell, matrix, nextSelector} from './helpers';
import {TableSelection} from './TableSelection';
import {$} from '@core/dom';
import * as actions from '@/store/actions';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor ($el, options) {
		super($el, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options,
		});
	}

	onKeydown (event) {
		const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
		const {key} = event;
		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault();
			const id = this.selection.current.id(true);
			const $next = this.$root.find(nextSelector(key, id));
			this.selectCell($next);
		}
	}

	onInput (event) {
		this.updateTextInStore($(event.target).text());
	}

	updateTextInStore (value) {
		this.$dispatch(actions.changeText({
			id: this.selection.current.id(),
			value
		}));
	}

	onMousedown (event) {
		if (shouldResize(event)) {
			this.resizeHandler(event);
		} else if (isCell(event)) {
			const $target = $(event.target);
			if (event.shiftKey) {
				const $cells = matrix($target, this.selection.current)
					.map(id => this.$root.find(`[data-id="${id}"]`));
				this.selection.selectGroup($cells);
			} else {
				this.selectCell($target);
			}
		}
	}

	async resizeHandler (event) {
		try {
			const data = await resizeHandler(this.$root, event);
			this.$dispatch(actions.tableResize(data));
		} catch (e) {
			console.warn(e.message);
		}
	}

	toHTML () {
		return createTable(30, this.store.getState());
	}

	prepare () {
		this.selection = new TableSelection();
	}

	init () {
		super.init();
		const $cell = this.$root.find('[data-id="0:0"]');
		this.selectCell($cell);
		this.$on('formula:input', text => {
			this.selection
				.current
				.attr('data-value', text)
				.text(parse(text));
			this.selection.current.text(text);
			this.updateTextInStore(text);
		});
		this.$on('formula:done', () => {
			this.selection.current.focus();
		});
		this.$on('toolbar:applyStyle', style => {
			this.selection.applyStyle(style);
			this.$dispatch(actions.applyStyle({
				value: style,
				ids: this.selection.selectedIds
			}));
		});
	}

	selectCell ($cell) {
		this.selection.select($cell);
		this.$emit('table:select', $cell);
		const styles = $cell.getStyles(Object.keys(defaultStyles));
		this.$dispatch(actions.changeStyles(styles));
	}
}
