webpackHotUpdate(0,{

/***/ 5:
/***/ function(module, exports) {

	'use strict';
	
	var thumb = document.getElementsByClassName('slider__thumb')[0];
	function clearSelection() {
		if (window.getSelection) {
			window.getSelection().removeAllRanges();
		} else {
			document.selection.empty();
		}
	}
	
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
			steps[1] += 3;
			steps[2] += 3;
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
				console.log(this.thumb.style.left);
			}
		};
	}
	var slider = new Slider();
	thumb.style.left = slider.initialThumbPoint;
	console.log(slider.steps);
	
	thumb.addEventListener('mousedown', function (eventDown) {
		console.log('hi mouse');
		slider.thumbBox = slider.thumb.getBoundingClientRect();
		slider.deltaX = eventDown.clientX - slider.thumbBox.left;
		slider.moveHandler = function (eventMove) {
			var targetX = eventMove.pageX;
			slider.moveThumb(targetX);
		};
		slider.upHandler = function (eventUp) {
			clearSelection();
			document.removeEventListener('mousemove', slider.moveHandler, false);
			var pos = eventUp.pageX - slider.sliderBox.left;
			slider.stopThumb(pos);
		};
		document.addEventListener('mousemove', slider.moveHandler, false);
		document.addEventListener('mouseup', slider.upHandler, false);
	}, false);
	
	thumb.addEventListener('touchstart', function (eventDown) {
		eventDown.preventDefault();
		console.log('hi touch');
		slider.thumbBox = slider.thumb.getBoundingClientRect();
		slider.deltaX = eventDown.targetTouches[0].clientX - slider.thumbBox.left;
		slider.moveHandler = function (eventMove) {
			if (eventMove.target.className === 'slider__thumb') {
				var targetX = eventMove.targetTouches[0].pageX;
				slider.moveThumb(targetX);
			}
		};
		slider.upHandler = function (eventUp) {
			if (eventUp.target.className === 'slider__thumb') {
				document.removeEventListener('touchmove', slider.moveHandler, false);
				var pos = eventUp.changedTouches[0].pageX - slider.sliderBox.left;
				slider.stopThumb(pos);
			}
		};
		document.addEventListener('touchmove', slider.moveHandler, false);
		document.addEventListener('touchend', slider.upHandler, false);
	}, { passive: false, capture: false });

/***/ }

})
//# sourceMappingURL=0.81efc49ebfcdb7d0e35b.hot-update.js.map