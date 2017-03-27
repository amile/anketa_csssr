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
				this.steps.forEach(function (_, i) {
					var curr = this.steps[i];
					var next = i < this.steps.length ? this.steps[i + 1] : this.sliderBox.width;
					if (pos > curr && pos < next) {
						stop = pos - curr < (next - curr) / 2 ? curr : next;
					}
				});
				this.thumb.style.left = stop - Math.floor(this.thumbBox.width / 2) + 'px';
			}
		};
	}
	function MouseSlider() {
		Slider.call(this);
		this.mouseMoveHandler = function (eventMove) {
			var targetX = eventMove.pageX;
			this.moveThumb(targetX);
		};
		this.mouseUpHandler = function (eventUp) {
			document.removeEventListener('mousemove', this.mouseMoveHandler, false);
			var pos = eventUp.pageX - this.sliderBox.left;
			this.stopThumb(pos);
		};
		this.mouseHandler = function (eventDown) {
			this.thumbBox = this.thumb.getBoundingClientRect();
			this.deltaX = eventDown.clientX - this.thumbBox.left;
			document.addEventListener('mousemove', this.mouseMoveHandler, false);
			document.addEventListener('mouseup', this.mouseUpHandler, false);
		};
	}
	function handler() {
		thumb.addEventListener('mousedown', function (eventDown) {
			var slider = new MouseSlider();
			console.log(slider.mouseMoveHandler);
		}, false);
		/* thumb.addEventListener('touchstart', function (eventDown) {
	 	const thumbBox = thumb.getBoundingClientRect();
	 	const deltaX = eventDown.clientX - thumbBox.left;
	 }, {passive: false}); */
	}
	handler();

/***/ }

})
//# sourceMappingURL=0.fc34299b40be9bb676be.hot-update.js.map