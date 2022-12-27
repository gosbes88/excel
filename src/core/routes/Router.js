import {$} from '@core/dom';
import {ActiveRoute} from './ActiveRoute';

export class Router {
	constructor (selector, routes) {
		if (!selector) {
			throw new Error('no selector');
		}
		this.$placeholder = $(selector);
		this.routes = routes;
		this.page = null;
		this.change = this.change.bind(this);
		this.init();
	}

	init () {
		window.addEventListener('hashchange', this.change);
		this.change();
	}

	change () {
		this.page?.destroy?.();
		const Page = ActiveRoute.path.includes('excel')
			? this.routes.excel
			: this.routes.dashboard;
		this.page = new Page(ActiveRoute.param);
		this.$placeholder
			.clear()
			.append(this.page.getRoot());
		this.page.afterRender();
	}

	destroy () {
		window.removeEventListener('hashchange', this.change);
	}
}
