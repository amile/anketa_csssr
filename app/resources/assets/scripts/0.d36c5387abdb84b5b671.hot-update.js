webpackHotUpdate(0,{

/***/ 5:
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
		function clearSelection() {
			if (window.getSelection) {
				window.getSelection().removeAllRanges();
			} else {
				document.selection.empty();
			}
		}
		thumb.onmousedown = function (e) {
			var sliderBox = slider.getBoundingClientRect();
			var thumbBox = thumb.getBoundingClientRect();
			var deltaX = e.pageX - thumbBox.left;
			var prev_onmousemove = document.onmousemove;
			var prev_onmouseup = document.onmouseup;
			document.onmousemove = function (e) {
				if (e.pageX - deltaX < sliderBox.left - thumbBox.width / 2) {
					thumb.style.left = 0 - Math.floor(thumbBox.width / 2) + 'px';
				} else if (e.pageX + thumbBox.width / 2 - deltaX > sliderBox.right) {
					thumb.style.left = sliderBox.width - Math.ceil(thumbBox.width / 2) + "px";
				} else {
					thumb.style.left = e.pageX - sliderBox.left - deltaX + 'px';
				}
			};
			document.onmouseup = function (e) {
				/*if (!window.getSelection) {
	   document.selection.empty();
	   }*/
				var pos = e.pageX - sliderBox.left;
				if (pos < 0) {
					thumb.style.left = 0 - Math.floor(thumbBox.width / 2) + 'px';
				} else if (pos > sliderBox.width) {
					thumb.style.left = sliderBox.width - Math.ceil(thumbBox.width / 2) + "px";
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
				document.onmousemove = prev_onmousemove;
				document.onmouseup = prev_onmouseup;
			};
		};
	}

/***/ }

})
//# sourceMappingURL=0.d36c5387abdb84b5b671.hot-update.js.map