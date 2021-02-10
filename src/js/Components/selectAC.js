class SelectAutoComplete {
	constructor () {
		this.doc = $(document);

		this.doc.on('keyup', '.js-selectAC-input', (e) => { this.filterOptions(e); });
		this.doc.on('click', '.js-show-options', (e) => { this.activeInput(e); });
		this.doc.on('blur', '.js-selectAC-input', (e) => { this.outInput(e); });
		this.doc.on('click', '.js-selectAC-containerOptions', (e) => { this.selectOption(e); });

		this.init();
	}

	init ($select = $('.js-selectAC'), typeCreation = 1) {
		let _this = this;

		$select.each((i, data) => {
			let $data = $(data);

			_this.createContainer($data, typeCreation);
		});
	}

	createContainer ($data, typeCreation) {
		let $container = $('<div>').addClass(`js-selectAC-container selectAC-container type-container-${typeCreation}`);
		let $input = $('<input>').addClass('js-selectAC-input selectAC-input form-control');
		let $icon = $('<i>').addClass('js-show-options icon-chevron-right');
		let $label = $('<label>').html( $data.attr('data-label') ).attr('for', $data.attr('name'));
		let $containerInput;

		if (typeCreation == 1) {
			$containerInput = $('<div>').addClass('form-group');

			if ($data.attr('data-label')) {
				$containerInput.append( $label );
			}

			$containerInput.append( $input );
			$containerInput.append( $icon );
			$container.append($containerInput);
		} else {
			$container.append( $input );
			$container.append( $icon );
		}

		let $containerOptions = $('<div>').addClass('js-selectAC-containerOptions selectAC-containerOptions');
		$containerOptions.html( $data.find('option').clone() );

		if ( $containerOptions.find('[selected]').length >= 1) {
			$input.val( $containerOptions.find('[selected]').text() );
		}
		
		$container.append($containerOptions);

		$data.after($container);
		$container.prepend($data);
		$data.addClass('hidden');
	}

	activeInput (e) {
		setTimeout(() => {
			let $this = $(e.target);
			let $container = $this.parents('.js-selectAC-container');
			let $cOptions = $container.find('.js-selectAC-containerOptions');
			let $input  = $container.find('.js-selectAC-input');

			$cOptions.fadeIn().addClass('active');
			$input.focus();
		}, 150);
	}

	outInput (e) {
		setTimeout(() => {
			let $this = $(e.target);
			let $container = $this.parents('.js-selectAC-container');
			let $cOptions = $container.find('.js-selectAC-containerOptions');
			let $input  = $container.find('.js-selectAC-input');
			let $select = $container.find('select');

			if ($input.val() == '') {
				$select.val('');
			}

			$cOptions.fadeOut().removeClass('active');
		}, 150);
	}

	selectOption (e) {
		let $this = $(e.target);
		let $container = $this.parents('.js-selectAC-container');
		let $select = $container.find('select');
		let $input  = $container.find('.js-selectAC-input');
		let $cOptions = $container.find('.js-selectAC-containerOptions');


		$select.val( $this.val() );
		$input.val( $this.text() );
		$cOptions.fadeOut().removeClass('active');
	}

	filterOptions (e) {
		let $this = $(e.target);
		let $container = $this.parents('.js-selectAC-container');
		let $cOptions = $container.find('.js-selectAC-containerOptions');
		let $input  = $container.find('.js-selectAC-input');
		let value = $this.val().toLowerCase();

		$cOptions.find('option').each((i, data) => {
			if ($(data).html().toLowerCase().indexOf(value) >= 0) {
				$(data).removeClass('hidden');
			} else {
				$(data).addClass('hidden');
			}
		});

		if (value == '') {
			$cOptions.fadeIn().addClass('active');
			$cOptions.find('option').removeClass('hidden');
			$input.val('');
		} else {
			$cOptions.fadeIn().addClass('active');
		}
	}
}

const selectAC = new SelectAutoComplete();