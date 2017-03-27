webpackHotUpdate(0,{

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _create = __webpack_require__(7);
	
	var _create2 = _interopRequireDefault(_create);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function clearSelection() {
		if (window.getSelection) {
			window.getSelection().removeAllRanges();
		} else {
			document.selection.empty();
		}
	}
	function Slider() {
		this.slider = document.getElementsByClassName('slider')[0];
		this.thumb = document.getElementsByClassName('slider__thumb')[0];
		this.sliderBox = this.slider.getBoundingClientRect();
		this.thumbBox = this.thumb.getBoundingClientRect();
		this.sliderElements = document.getElementsByClassName('slider__item');
		this.getSteps = function () {
			var steps = [];
			var prev = 0;
			var shiftX = 3; // Смещение точки остановки бегунка относительно начала элемента.
			Array.prototype.forEach.call(this.sliderElements, function (el, i) {
				steps.push(prev);
				prev += el.offsetWidth;
				if (i === 0) {
					prev += shiftX;
				}
			});
			steps[steps.length - 1] = this.slider.offsetWidth;
			return steps;
		};
		this.steps = this.getSteps();
		this.initialThumbPoint = this.steps[2] - Math.floor(this.thumb.offsetWidth / 2) + 'px';
		this.deltaX = 0;
	}
	Slider.prototype.moveThumb = function (targetX) {
		if (targetX - this.deltaX < this.sliderBox.left - this.thumbBox.width / 2) {
			this.thumb.style.left = 0 - Math.floor(this.thumbBox.width / 2) + 'px';
		} else if (targetX + this.thumbBox.width / 2 - this.deltaX > this.sliderBox.right) {
			this.thumb.style.left = this.sliderBox.width - Math.ceil(this.thumbBox.width / 2) + 'px';
		} else {
			this.thumb.style.left = targetX - this.sliderBox.left - this.deltaX + 'px';
		}
	};
	Slider.prototype.stopThumb = function (pos) {
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
	function TouchSlider() {
		Slider.apply(this);
	}
	
	TouchSlider.prototype = (0, _create2.default)(Slider.prototype);
	TouchSlider.prototype.moveHandler = function (eventMove) {
		if (eventMove.target.className === 'slider__thumb') {
			var targetX = eventMove.targetTouches[0].pageX;
			this.moveThumb(targetX);
		}
	};
	TouchSlider.prototype.upHandler = function (eventUp) {
		if (eventUp.target.className === 'slider__thumb') {
			document.removeEventListener('touchmove', moveHandler, false);
			var pos = eventUp.changedTouches[0].pageX - this.sliderBox.left;
			this.stopThumb(pos);
		}
	};
	TouchSlider.handler = function () {
		this.thumb.addEventListener('touchstart', function (eventDown) {
			eventDown.preventDefault();
			this.thumbBox = this.thumb.getBoundingClientRect();
			this.deltaX = eventDown.targetTouches[0].clientX - this.thumbBox.left;
			document.addEventListener('touchmove', moveHandler, false);
			document.addEventListener('touchend', upHandler, false);
		}, { passive: false, capture: false });
	};
	MouseSlider.prototype = (0, _create2.default)(Slider.prototype);
	MouseSlider.prototype.moveHandler = function (eventMove) {
		var targetX = eventMove.pageX;
		this.moveThumb(targetX);
	};
	MouseSlider.prototype.upHandler = function (eventUp) {
		clearSelection();
		document.removeEventListener('mousemove', moveHandler, false);
		var pos = eventUp.pageX - this.sliderBox.left;
		this.stopThumb(pos);
	};
	MouseSlider.prototype.handler = function () {
		this.thumb.addEventListener('mousedown', function (eventDown) {
			console.log(this);
			var thumbBox = this.getBoundingClientRect();
			var deltaX = eventDown.clientX - thumbBox.left;
			document.addEventListener('mousemove', moveHandler, false);
			document.addEventListener('mouseup', upHandler, false);
		}, false);
	};
	function MouseSlider() {
		Slider.apply(this);
	}
	var slider = new MouseSlider();
	slider.thumb.style.left = slider.initialThumbPoint;
	slider.handler();

/***/ }

})
//# sourceMappingURL=0.423350fbb46ab096c7cb.hot-update.js.map