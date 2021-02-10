class CreateBgImage {
	init($image, $boxToApply) {
		let bg = $image.attr('src'); 

		$image.addClass('hidden');
		$boxToApply.css({
			'background-image': ` url(" ${bg} ") `
		});
	}
}

const createBgImage = new CreateBgImage();