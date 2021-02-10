const routers = new class Router {
	constructor () {

		$(window).on('hashchange', e => this.init());
		
		this.init();
	}

	allRoutes () {
		return [
		{page: '', url: 'src/HTML/Pages/pix.html'},
		{page: 'pix', url: 'src/HTML/Pages/pix.html'}
		];
	}

	getPage (pageCode) {
		let page = this.allRoutes().find( e => e.page == pageCode );

		if (!page) {
			window.location = '/';
		}

		return page;
	}

	init () {
		const hashPage = location.hash.replace(/[#\/]/g, '');
		const sideBar = {url: '../src/HTML/Components/sideBar.html', el: $('.js-side-bar')};

		const page = this.getPage(hashPage);
		page.el = $('.js-main-content');

		this.addComponents(page);
		this.addComponents(sideBar);
	}

	addComponents (page) {
		page.el.load(page.url);
	}
}();