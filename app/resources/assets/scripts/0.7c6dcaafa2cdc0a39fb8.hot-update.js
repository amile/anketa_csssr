webpackHotUpdate(0,{

/***/ 5:
/***/ function(module, exports) {

	'use strict';
	
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
		console.log(steps);
		function clearSelection() {
			if (window.getSelection) {
				window.getSelection().removeAllRanges();
			} else {
				document.selection.empty();
			}
		}
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
				clearSelection();
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
						}
					});
					console.log(stop);
					thumb.style.left = stop - Math.floor(thumbBox.width / 2) + 'px';
				}
				document.onmousemove = prevOnMouseMove;
				document.onmouseup = prevOnMouseUp;
			};
		};
	}
	moveSlider();

/***/ }

})
//# sourceMappingURL=0.7c6dcaafa2cdc0a39fb8.hot-update.js.map