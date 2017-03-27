webpackHotUpdate(0,{

/***/ 6:
/***/ function(module, exports) {

	'use strict';
	
	function Slider() {
		this.slider = document.getElementsByClassName('slider')[0];
		this.thumb = document.getElementsByClassName('slider__thumb')[0];
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
		this.mouseUpHandler = function (eventMove) {
			document.removeEventListener('mousemove', this.mouseMoveHandler, false);
			this.moveThumb(targetX);
		};
		this.handler = function (eventDown) {
			this.deltaX = eventDown.clientX - this.thumbBox.left;
			document.addEventListener('mousemove', this.mouseMoveHandler, false);
			document.addEventListener('mouseup', this.mouseUpHandler, false);
		};
	}
	/* function handler() {
		thumb.addEventListener('mousedown', function (eventDown) {
			const thumbBox = thumb.getBoundingClientRect();
			const deltaX = eventDown.clientX - thumbBox.left;
		}, false);
		thumb.addEventListener('touchstart', function (eventDown) {
			const thumbBox = thumb.getBoundingClientRect();
			const deltaX = eventDown.clientX - thumbBox.left;
		}, {passive: false});
	} */
	var slider = new MouseSlider();
	slider.thumb.style.left = slider.initialThumbPoint;
	console.log(slider.mouseMoveHandler());

/***/ }

})
//# sourceMappingURL=0.78b463a497ef7931f7e8.hot-update.js.map