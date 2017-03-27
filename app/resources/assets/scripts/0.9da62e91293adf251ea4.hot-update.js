webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _svg4everybody = __webpack_require__(1);
	
	var _svg4everybody2 = _interopRequireDefault(_svg4everybody);
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _slider = __webpack_require__(5);
	
	var _slider2 = _interopRequireDefault(_slider);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _jquery2.default)(function () {
		(0, _svg4everybody2.default)();
	});
	(0, _jquery2.default)(document).ready(function () {
		console.log('Hi');
	});

/***/ },

/***/ 5:
/***/ function(module, exports) {

	"use strict";
	
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
//# sourceMappingURL=0.9da62e91293adf251ea4.hot-update.js.map