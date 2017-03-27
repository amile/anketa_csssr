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
	mouseSlider.initialThumbPoint;
	console.log(mouseSlider.initialThumbPoint);
	
	var touchSlider = new Slider();
	touchSlider.initialThumbPoint;
	console.log(touchSlider.initialThumbPoint);
	
	thumb.addEventListener('mousedown', function (eventDown) {
		console.log('hi mouse');
		mouseSlider.thumbBox = mouseSlider.thumb.getBoundingClientRect();
		mouseSlider.deltaX = eventDown.clientX - mouseSlider.thumbBox.left;
		mouseSlider.moveHandler = function (eventMove) {
			var targetX = eventMove.pageX;
			mouseSlider.moveThumb(targetX);
		};
		mouseSlider.upHandler = function (eventUp) {
			document.removeEventListener('mousemove', mouseSlider.moveHandler, false);
			var pos = eventUp.pageX - mouseSlider.sliderBox.left;
			mouseSlider.stopThumb(pos);
		};
		document.addEventListener('mousemove', mouseSlider.moveHandler, false);
		document.addEventListener('mouseup', mouseSlider.upHandler, false);
	}, false);
	
	thumb.addEventListener('touchstart', function (eventDown) {
		eventDown.preventDefault();
		console.log('hi touch');
		touchSlider.thumbBox = touchSlider.thumb.getBoundingClientRect();
		touchSlider.deltaX = eventDown.targetTouches[0].clientX - touchSlider.thumbBox.left;
		touchSlider.moveHandler = function (eventMove) {
			if (eventMove.target.className === 'slider__thumb') {
				var targetX = eventMove.targetTouches[0].pageX;
				touchSlider.moveThumb(targetX);
			}
		};
		touchSlider.upHandler = function (eventUp) {
			if (eventUp.target.className === 'slider__thumb') {
				document.removeEventListener('touchmove', touchSlider.moveHandler, false);
				var pos = eventUp.pageX - touchSlider.sliderBox.left;
				touchSlider.stopThumb(pos);
			}
		};
		document.addEventListener('touchmove', touchSlider.moveHandler, false);
		document.addEventListener('touchend', touchSlider.upHandler, false);
	}, { passive: false });

/***/ }

})
//# sourceMappingURL=0.ff1eb47da41d5b1fd8ac.hot-update.js.map