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
	(0, _jquery2.default)(document).ready(function () {
		(0, _svg4everybody2.default)();
		console.log('Hi');
		moveSlider();
	});

/***/ },

/***/ 6:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.moveSlider = moveSlider;
	function moveSlider() {
		var slider = document.getElementsByClassName('slider')[0];
		var thumb = document.getElementsByClassName('slider__thumb')[0];
		var sliderElements = document.getElementsByClassName('slider__item');
		var steps = [];
		var prev = 0;
		Array.prototype.forEach.call(sliderElements, function (el) {
			steps.push(prev);
			prev += el.offsetWidth;
		});
		steps[steps.length - 1] = slider.offsetWidth;
		/* function clearSelection() {
	 		if (window.getSelection) {
	 			window.getSelection().removeAllRanges();
	 		} else {
	 			document.selection.empty();
	 		}
	 } */
		thumb.onmousedown = function (eventDown) {
			var sliderBox = slider.getBoundingClientRect();
			var thumbBox = thumb.getBoundingClientRect();
			var deltaX = eventDown.pageX - thumbBox.left;
			var prevOnMouseMove = document.onmousemove;
			var prevOnMouseUp = document.onmouseup;
			document.onmousemove = function (eventMove) {
				if (eventMove.pageX - deltaX < sliderBox.left - thumbBox.width / 2) {
					thumb.style.left = 0 - Math.floor(thumbBox.width / 2) + 'px';
				} else if (eventMove.pageX + thumbBox.width / 2 - deltaX > sliderBox.right) {
					thumb.style.left = sliderBox.width - Math.ceil(thumbBox.width / 2) + 'px';
				} else {
					thumb.style.left = eventMove.pageX - sliderBox.left - deltaX + 'px';
				}
			};
			document.onmouseup = function (eventUp) {
				/* if (!window.getSelection) {
	   		document.selection.empty();
	   } */
				var pos = eventUp.pageX - sliderBox.left;
				if (pos < 0) {
					thumb.style.left = 0 - Math.floor(thumbBox.width / 2) + 'px';
				} else if (pos > sliderBox.width) {
					thumb.style.left = sliderBox.width - Math.ceil(thumbBox.width / 2) + 'px';
				} else {
					var stop = 0;
					steps.forEach(function (_, i) {
						var curr = steps[i];
						var next = i < steps.length ? steps[i + 1] : sliderBox.width;
						if (pos > curr && pos < next) {
							stop = pos - curr < (next - curr) / 2 ? curr : next;
							console.log(curr, next, stop);
						}
					});
					thumb.style.left = stop - thumbBox.width / 2 + 'px';
				}
				document.onmousemove = prevOnMouseMove;
				document.onmouseup = prevOnMouseUp;
			};
		};
	}

/***/ }

})
//# sourceMappingURL=0.729a2d103f23d671198d.hot-update.js.map