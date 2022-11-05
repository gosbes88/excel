import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
	static className = 'excel__formula';

	constructor ($el) {
		super($el, {
			name: 'Formula',
			listeners: ['input', 'click'],
		});
	}

	toHTML () {
		return `
			<div class="info">fx</div>
            <div class="input" contenteditable="true" spellcheck="false"></div>
		`;
	}

	onInput (event) {
		console.log('ononon formule', event)
	}

	onClick () {

	}
}
