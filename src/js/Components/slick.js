class SlickCustom {
	constructor () {
		this.doc = $(document);
		
		this.slickConfig = {
			"default":{
				infinite: true,
				prevArrow: "<span class='glyphicon glyphicon-chevron-left'></span>",
				nextArrow: "<span class='glyphicon glyphicon-chevron-right'></span>",
				slidesToShow: 7,
				responsive: [{
					breakpoint: 1024,
					settings: {
						slidesToShow: 5
					}
				},
				{
					breakpoint: 640,
					settings: {
						slidesToShow: 4
					}
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 2
					}
				}]
			},
			"my-config":{
				infinite: true,
				prevArrow: "<span class='glyphicon glyphicon-chevron-left'></span>",
				nextArrow: "<span class='glyphicon glyphicon-chevron-right'></span>",
				slidesToShow: 3,
				responsive: [{
					breakpoint: 800,
					settings: {
						slidesToShow: 2
					}
				}]
			}
		};

		this.bindSlicks();
	}

	bindSlicks () {
		let _this = this;
		$(".js-slick").each(function(){
			var $c = $(this);
			$.each(_this.slickConfig, (key,config) => {
				if($c.hasClass("js-slick-"+key)){
					var $e = _this.doc.find(".js-slick-"+key);
					$e.slick(config);
				}
			});
		});
	}

	bindExactSlick (slides = [[$slide, 'default']]) {
		let _this = slickCustom;

		$.each(slides, function(index, slide) {
			let $selector = slide[0];
			let config = slide[1];

			$selector.slick(_this.slickConfig[config]);
		});		
	}
}

const slickCustom = new SlickCustom();