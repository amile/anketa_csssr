webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _svg4everybody = __webpack_require__(1);
	
	var _svg4everybody2 = _interopRequireDefault(_svg4everybody);
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	__webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _jquery2.default)(function () {
		(0, _svg4everybody2.default)();
	});

/***/ },

/***/ 6:
/***/ function(module, exports) {

	'use strict';
	
	function Slider() {
		this.slider = document.getElementsByClassName('slider')[0];
		this.thumb = document.getElementsByClassName('slider__thumb')[0];
		this.sliderBox = slider.getBoundingClientRect();
		this.thumbBox = thumb.getBoundingClientRect();
		this.sliderElements = document.getElementsByClassName('slider__item');
		this.getSteps = function () {
			var steps = [];
			var prev = 0;
			Array.prototype.forEach.call(this.sliderElements, function (el) {
				steps.push(prev);
				prev += el.offsetWidth;
			});
			steps[steps.length - 1] = slider.offsetWidth;
			return steps;
		};
		this.steps = this.getSteps();
		this.initialThumbPoint = steps[2] - Math.floor(thumb.offsetWidth / 2) + 'px';
		this.moveThumb = function (targetX, deltaX) {
			if (targetX - deltaX < this.sliderBox.left - this.thumbBox.width / 2) {
				this.thumb.style.left = 0 - Math.floor(this.thumbBox.width / 2) + 'px';
			} else if (targetX + this.thumbBox.width / 2 - deltaX > this.sliderBox.right) {
				thumb.style.left = this.sliderBox.width - Math.ceil(this.thumbBox.width / 2) + 'px';
			} else {
				thumb.style.left = targetX - this.sliderBox.left - deltaX + 'px';
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
	var slider = new Slider();
	console.log(slider.steps);

/***/ }

})
//# sourceMappingURL=0.a853b53468b32216a529.hot-update.js.map