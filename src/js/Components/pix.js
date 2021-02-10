const pixConfig = {
	size: 300,
	setInterval: 2000,
	url: 'http://localhost:3000/response.json',
	status: 'waiting',
	value: ''
};

const pixMessages = {
	requestError: 'Ops! Houve um erro com a requisição de pagamento, tente mais tarde, por favor',
	paymentError: 'Ops! Houve um erro com o Pagamento, tente mais tarde, por favor',
	paymentSuccess: 'Pagamento realizado com sucesso!',
	infoAboutPix: 'Este é o QrCode do Pix, usando seu aplicativo Pix, aponte sua camera para ler o codigo abaixo.',
};

const pix = new class Pix {
	constructor () {
		const _this = this;
		const $doc = $(document);

		this.paymentApproved = false;
	}

	generateCode (value, config = pixConfig) {
		const mergedConfig = {...pixConfig, ...config};
		const $qrCode = $('.js-qr-code');
		const $message = `<p class="alert alert-info js-qr-code-info"> ${pixMessages.infoAboutPix} </p>`;

		$qrCode.empty();
		$qrCode.before( $message );
		$qrCode.qrcode({width: mergedConfig.size, height: mergedConfig.size, text: value});

		mergedConfig.value = value;
		this.checkStatus(mergedConfig);
	}

	checkStatus (data) {
		const _this = this;
		let $message = '';

		if (data && data.status === 'true') {
			_this.refreshView({message: pixMessages.paymentSuccess, type: 'success'});
		}

		if (data && data.status === 'false') {
			_this.refreshView({message: pixMessages.paymentError, type: 'danger'});
		}

		if (data && data.status != 'waiting') {
			return false;
		}

		setTimeout(() => {
			this.getStatus(data);
		}, 2000);
	}

	getStatus  (data)  {
		const _this = this;
		
		$.ajax({
			async: false,
			url: data.url,
			type: 'GET',
			data: {value: data.value}
		})
		.done(function(response) {
			data.status = response.status;
			_this.checkStatus(data);
		})
		.fail(function() {
			data.status = 'false';
			_this.checkStatus(data);
			_this.refreshView({message: pixMessages.requestError, type: 'danger'});
		});
	}

	refreshView (configInfo = {message: '', type: 'success', el: '.js-qr-code'}) {
		const $message = `<p class="alert alert-${configInfo.type}"> ${configInfo.message} </p>`;

		$('.js-qr-code').html( $message );
		$('.js-qr-code-info').remove();
	}
}();