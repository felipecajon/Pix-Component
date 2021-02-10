const pagePix = new class pagePix {
	constructor () {
		const _this = this;
		const $doc = $(document);

		this.createInputListner();
	}

	delay (callback, ms) {
		var timer = 0;

		return function() {
			var context = this, args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function () {
				callback.apply(context, args);
			}, ms || 0);
		};
	}

	createInputListner ( ) {
		const _this = this;
		const $doc = $(document);

		$doc.on('keyup', '.js-generate-code', _this.delay(function (e) {
			const value = this.value;

			if ( value != '' ) {
				// 500 milisegundos apos a digitação do cod. é disparado o 
				// generateCode do componente pix, passando o valor e outros parametros opcionais como:
				// size: Valor em px que o QrCode deve ser gerado
				// setInterval: Tempo ( em milisegundos ) entre as futuras requisições sobre o status do pagamento

				pix.generateCode(value, {size: 300, setInterval: 2000}); 
				$(this).addClass('hidden');
			}


		}, 500));
	}
}();