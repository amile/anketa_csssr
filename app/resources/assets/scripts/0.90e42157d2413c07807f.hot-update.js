webpackHotUpdate(0,{

/***/ 6:
/***/ function(module, exports) {

	'use strict';
	
	var thumb = document.getElementsByClassName('slider__thumb')[0];
	
	function Slider() {
		this.slider = document.getElementsByClassName('slider')[0];
		this.thumb = thumb;
		this.sliderBox = this.slider.getBoundingClientRect();
		this.thumbBox = this.thumb.getBoundingClientRect();
		this.sliderElements = document.getElementsByClassName('slider__item');
		this.getSteps = function () {
			var steps = [];
			var prev = 0;
			Array.prototype.forEach.call(this.sliderElements, function (el) {
				steps.push(prev);
				prev += el.offsetWidth;
			});
			steps[steps.length - 1] = this.slider.offsetWidth;
			return steps;
		};
		this.steps = this.getSteps();
		this.initialThumbPoint = this.steps[2] - Math.floor(this.thumb.offsetWidth / 2) + 'px';
		this.deltaX = 0;
		this.moveThumb = function (targetX) {
			if (targetX - this.deltaX < this.sliderBox.left - this.thumbBox.width / 2) {
				this.thumb.style.left = 0 - Math.floor(this.thumbBox.width / 2) + 'px';
			} else if (targetX + this.thumbBox.width / 2 - this.deltaX > this.sliderBox.right) {
				this.thumb.style.left = this.sliderBox.width - Math.ceil(this.thumbBox.width / 2) + 'px';
			} else {
				this.thumb.style.left = targetX - this.sliderBox.left - this.deltaX + 'px';
			}
		};
		this.stopThumb = function (pos) {
			if (pos < 0) {
				this.thumb.style.left = 0 - Math.floor(this.thumbBox.width / 2) + 'px';
			} else if (pos > this.sliderBox.width) {
				this.thumb.style.left = this.sliderBox.width - Math.ceil(this.thumbBox.width / 2) + 'px';
			} else {
				var stop = 0;
				var steps = this.steps;
				steps.forEach(function (_, i) {
					var curr = steps[i];
					var next = i < steps.length ? steps[i + 1] : this.sliderBox.width;
					if (pos > curr && pos < next) {
						stop = pos - curr < (next - curr) / 2 ? curr : next;
					}
				});
				this.thumb.style.left = stop - Math.floor(this.thumbBox.width / 2) + 'px';
			}
		};
	}
	var mouseSlider = new Slider();
	
	var touchSlider = new Slider();
	
	thumb.addEventListener('mousedown', function (eventDown) {
		mouseSlider.thumbBox = mouseSlider.thumb.getBoundingClientRect();
		mouseSlider.deltaX = eventDown.clientX - mouseSlider.thumbBox.left;
		mouseSlider.mouseMoveHandler = function (eventMove) {
			var targetX = eventMove.pageX;
			mouseSlider.moveThumb(targetX);
		};
		mouseSlider.mouseUpHandler = function (eventUp) {
			document.removeEventListener('mousemove', mouseSlider.mouseMoveHandler, false);
			var pos = eventUp.pageX - mouseSlider.sliderBox.left;
			mouseSlider.stopThumb(pos);
		};
		document.addEventListener('mousemove', mouseSlider.mouseMoveHandler, false);
		document.addEventListener('mouseup', mouseSlider.mouseUpHandler, false);
	}, false);
	
	/* function MouseSlider() {
		Slider.call(this);
		this.mouseMoveHandler = function (eventMove) {
			const targetX = eventMove.pageX;
			this.moveThumb(targetX);
		};
		this.mouseUpHandler = function (eventUp) {
			console.log('hi');
			document.removeEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
			const pos = eventUp.pageX - this.sliderBox.left;
			this.stopThumb(pos);
		};
		this.mouseHandler = function (eventDown) {
			this.thumbBox = this.thumb.getBoundingClientRect();
			this.deltaX = eventDown.clientX - this.thumbBox.left;
			document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
			document.addEventListener('mouseup', this.mouseUpHandler.bind(this), false);
		};
	} */
	function handler() {
		thumb.addEventListener('mousedown', function (eventDown) {
			var slider = new MouseSlider();
			slider.mouseHandler(eventDown);
		}, false);
		/* thumb.addEventListener('touchstart', function (eventDown) {
	 	const thumbBox = thumb.getBoundingClientRect();
	 	const deltaX = eventDown.clientX - thumbBox.left;
	 }, {passive: false}); */
	}
	// handler();

/***/ }

})
//# sourceMappingURL=0.90e42157d2413c07807f.hot-update.js.map