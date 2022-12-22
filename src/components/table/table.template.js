import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

const CODES = Object.freeze({
	A: 65,
	Z: 90,
});
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createCell (state, row) {
	return function (_, index) {
		const width = getWidth(state, index);
		const id = `${row}:${index}`;
		const content = state.dataState[id] || '';
		const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]});
		return `
			<div
				class="cell"
				contenteditable
				data-col="${index}"
				data-id="${id}"
				data-type="cell"
				data-value="${content}"
				style="${styles}; width: ${width};"
			>
				${parse(content || '')}
			</div>
		`;
	};
}

function createCol (el, index) {
	return `
		<div class="column" data-type="resizable" data-col="${el.index}" style="width: ${el.width}">
			${el.col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`;
}

function createRow (index, content, state) {
	const height = getHeight(state, index);
	return `
		<div class="row" data-row="${index}" data-type="resizable" style="height: ${height}">
			<div class="row-info">
				${index || ''}
				${index ? `<div class="row-resize" data-resize="row"></div>` : ''}
			</div>
			<div class="row-data">${content}</div>
		</div>
	`;
}

function toChar (_, index) {
	return String.fromCharCode(CODES.A + index);
}

function getWidth (state, index) {
	return (state?.colState?.[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight (state, index) {
	return (state?.rowState?.[index] || DEFAULT_HEIGHT) + 'px';
}

function withWidthFromState (state) {
	return function (col, index) {
		return {
			col,
			index,
			width: getWidth(state, index)
		}
	}
}

export function createTable (rowsCount = 10, state = {}) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(withWidthFromState(state))
		.map(createCol)
		.join('');
	rows.push(createRow('', cols));
	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(createCell(state, row))
			.join('');
		rows.push(createRow(row + 1, cells, state));
	}
	return rows.join('');
}
