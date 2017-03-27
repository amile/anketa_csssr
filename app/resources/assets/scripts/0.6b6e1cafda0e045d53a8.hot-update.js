webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _svg4everybody = __webpack_require__(1);
	
	var _svg4everybody2 = _interopRequireDefault(_svg4everybody);
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	__webpack_require__(43);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _jquery2.default)(function () {
		(0, _svg4everybody2.default)();
	});

/***/ },

/***/ 43:
/***/ function(module, exports) {

	'use strict';
	
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
		this.initialThumbPoint = function () {
			this.thumb.left = this.steps[2] - Math.floor(this.thumb.offsetWidth / 2) + 'px';
			console.log(this.thumb.left);
		};
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
	
	var slider = new Slider();
	slider.initialThumbPoint();
	
	slider.thumb.addEventListener('mousedown', function (eventDown) {
		slider.thumbBox = this.getBoundingClientRect();
		slider.deltaX = eventDown.clientX - slider.thumbBox.left;
		function moveHandler(eventMove) {
			var targetX = eventMove.pageX;
			slider.moveThumb(targetX);
		}
		function upHandler(eventUp) {
			clearSelection();
			document.removeEventListener('mousemove', moveHandler, false);
			var pos = eventUp.pageX - slider.sliderBox.left;
			slider.stopThumb(pos);
		};
		document.addEventListener('mousemove', moveHandler, false);
		document.addEventListener('mouseup', upHandler, false);
	}, false);
	
	slider.thumb.addEventListener('touchstart', function (eventDown) {
		eventDown.preventDefault();
		slider.thumbBox = slider.thumb.getBoundingClientRect();
		slider.deltaX = eventDown.targetTouches[0].clientX - slider.thumbBox.left;
		function moveHandler(eventMove) {
			if (eventMove.target.className === 'slider__thumb') {
				var targetX = eventMove.targetTouches[0].pageX;
				slider.moveThumb(targetX);
			}
		};
		function upHandler(eventUp) {
			if (eventUp.target.className === 'slider__thumb') {
				document.removeEventListener('touchmove', moveHandler, false);
				var pos = eventUp.changedTouches[0].pageX - slider.sliderBox.left;
				slider.stopThumb(pos);
			}
		};
		document.addEventListener('touchmove', moveHandler, false);
		document.addEventListener('touchend', upHandler, false);
	}, { passive: false, capture: false });

/***/ }

})
//# sourceMappingURL=0.6b6e1cafda0e045d53a8.hot-update.js.map