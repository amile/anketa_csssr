webpackHotUpdate(0,{

/***/ 5:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.slider = slider;
	function slider() {
		var slider = document.getElementsByClassName("slider")[0];
		var thumb = document.getElementsByClassName("slider__thumb")[0];
		var slider_elements = document.getElementsByClassName("slider__item");
		var steps = [];
		var prev = 0;
		Array.prototype.forEach.call(slider_elements, function (el) {
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
			var slider_box = slider.getBoundingClientRect();
			var thumb_box = thumb.getBoundingClientRect();
			var deltaX = e.pageX - thumb_box.left;
			var prev_onmousemove = document.onmousemove;
			var prev_onmouseup = document.onmouseup;
			document.onmousemove = function (e) {
				if (e.pageX - deltaX < slider_box.left - thumb_box.width / 2) {
					thumb.style.left = 0 - Math.floor(thumb_box.width / 2) + "px";
				} else if (e.pageX + thumb_box.width / 2 - deltaX > slider_box.right) {
					thumb.style.left = slider_box.width - Math.ceil(thumb_box.width / 2) + "px";
				} else {
					thumb.style.left = e.pageX - slider_box.left - deltaX + "px";
				}
			};
			document.onmouseup = function (e) {
				/*if (!window.getSelection) {
	   document.selection.empty();
	   }*/
				var pos = e.pageX - slider_box.left;
				if (pos < 0) {
					thumb.style.left = 0 - Math.floor(thumb_box.width / 2) + "px";
				} else if (pos > slider_box.width) {
					thumb.style.left = slider_box.width - Math.ceil(thumb_box.width / 2) + "px";
				} else {
					var stop = 0;
					steps.forEach(function (_, i) {
						var curr = steps[i];
						var next = i < steps.length ? steps[i + 1] : slider_box.width;
						if (pos > curr && pos < next) {
							stop = pos - curr < (next - curr) / 2 ? curr : next;
							console.log(curr, next, stop);
						}
					});
					thumb.style.left = stop - thumb_box.width / 2 + "px";
				}
				document.onmousemove = prev_onmousemove;
				document.onmouseup = prev_onmouseup;
			};
		};
	}

/***/ }

})
//# sourceMappingURL=0.9e6c3da4ba599f60a119.hot-update.js.map