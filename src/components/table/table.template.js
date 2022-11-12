const CODES = Object.freeze({
	A: 65,
	Z: 90,
});

function createCell (row) {
	return function (content, index) {
		return `
			<div
				class="cell"
				contenteditable
				data-col="${index}"
				data-id="${row}:${index}"
				data-type="cell"
			>
				${content}
			</div>
		`;
	};
}

function createCol (el, index) {
	return `
		<div class="column" data-type="resizable" data-col="${index}">
			${el}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`;
}

function createRow (index, content) {
	return `
		<div class="row" data-type="resizable">
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

export function createTable (rowsCount = 10) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(createCol)
		.join('');
	rows.push(createRow('', cols));
	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(createCell(row))
			.join('');
		rows.push(createRow(row + 1, cells));
	}
	return rows.join('');
}
