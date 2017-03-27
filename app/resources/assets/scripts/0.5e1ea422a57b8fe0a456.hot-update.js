webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _svg4everybody = __webpack_require__(1);
	
	var _svg4everybody2 = _interopRequireDefault(_svg4everybody);
	
	var _jquery = __webpack_require__(2);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	__webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _jquery2.default)(function () {
		(0, _svg4everybody2.default)();
	});

/***/ },

/***/ 5:
/***/ function(module, exports) {

	'use strict';
	
	function moveSlider() {
		var slider = document.getElementsByClassName('slider')[0];
		var thumb = document.getElementsByClassName('slider__thumb')[0];
		var sliderBox = slider.getBoundingClientRect();
		console.log(sliderBox);
		var sliderElements = document.getElementsByClassName('slider__item');
		var steps = [];
		var prev = 0;
		Array.prototype.forEach.call(sliderElements, function (el) {
			steps.push(prev);
			prev += el.offsetWidth;
		});
		steps[steps.length - 1] = slider.offsetWidth;
		console.log(steps);
		thumb.style.left = steps[1] - Math.floor(thumb.offsetWidth / 2) + 'px';
		/* function clearSelection() {
	 	if (window.getSelection) {
	 		window.getSelection().removeAllRanges();
	 	}
	 	else {
	 		document.selection.empty();
	 	}
	 }
	 thumb.addEventListener('touchstart', function (eventDown) {
	 	const thumbBox = thumb.getBoundingClientRect();
	 	console.log(thumbBox);
	 	console.log(eventDown);
	 	const deltaX = eventDown.targetTouches[0].clientX - thumbBox.left;
	 	const left = thumb.style.left;
	 	thumb.style.left = left + 15 + 'px';
	 	const prevOnMouseMove = document.onmousemove;
	 	const prevOnMouseUp = document.onmouseup;
	 	document.addEventListener('touchmove', function (eventMove) {
	 		if (eventMove.targetTouches[0].pageX - deltaX < sliderBox.left - thumbBox.width / 2) {
	 			thumb.style.left = 0 - Math.floor(thumbBox.width / 2) + 'px';
	 		}
	 		else if (eventMove.pageX + thumbBox.width / 2 - deltaX > sliderBox.right) {
	 			thumb.style.left = sliderBox.width - Math.ceil(thumbBox.width / 2) + 'px';
	 		}
	 		else {
	 			thumb.style.left = eventMove.pageX - sliderBox.left - deltaX + 'px';
	 		}
	 	}, false);
	 	document.addEventListener('touchend', function (eventUp) {
	 		clearSelection();
	 		console.log(eventUp);
	 		const pos = eventUp.changedTouches[0].pageX - sliderBox.left;
	 		console.log('pos ' + pos);
	 		console.log('left ' + sliderBox.left);
	 		if (pos < 0) {
	 			thumb.style.left = 0 - Math.floor(thumbBox.width / 2) + 'px';
	 		}
	 		else if (pos > sliderBox.width) {
	 			thumb.style.left = sliderBox.width - Math.ceil(thumbBox.width / 2) + 'px';
	 		}
	 		else {
	 			let stop = 0;
	 			steps.forEach(function (_, i) {
	 				const curr = steps[i];
	 				const next = i < steps.length ? steps[i + 1] : sliderBox.width;
	 				if (pos > curr && pos < next) {
	 					stop = (pos - curr < (next - curr) / 2) ? curr : next;
	 				}
	 			});
	 			console.log('stop ' + stop);
	 			thumb.style.left = stop - Math.floor(thumbBox.width / 2) + 'px';
	 		}
	 		document.onmousemove = prevOnMouseMove;
	 		document.onmouseup = prevOnMouseUp;
	 	}, false);
	 }, false); */
		thumb.addEventListener('touchstart', function (eventDown) {
			var thumbBox = thumb.getBoundingClientRect();
			var deltaX = eventDown.targetTouches[0].clientX - thumbBox.left;
			function moveThumb(eventMove) {
				console.log(eventMove);
				eventMove.preventDefault();
				var targetX = eventMove.targetTouches[0].pageX;
				if (targetX - deltaX < sliderBox.left - thumbBox.width / 2) {
					thumb.style.left = 0 - Math.floor(thumbBox.width / 2) + 'px';
				} else if (targetX + thumbBox.width / 2 - deltaX > sliderBox.right) {
					thumb.style.left = sliderBox.width - Math.ceil(thumbBox.width / 2) + 'px';
				} else {
					thumb.style.left = targetX - sliderBox.left - deltaX + 'px';
				}
			}
			document.addEventListener('touchmove', moveThumb, { passive: false });
			document.addEventListener('touchend', function (eventUp) {
				console.log(eventUp);
				// const pos = eventUp.targetTouches[0].pageX - sliderBox.left;
				// console.log('pos ' + pos);
				// thumb.style.left = pos - deltaX + 'px';
				document.removeEventListener('touchmove', moveThumb);
				/*
	   console.log('left ' + sliderBox.left);
	   if (pos < 0) {
	   	thumb.style.left = 0 - Math.floor(thumbBox.width / 2) + 'px';
	   }
	   else if (pos > sliderBox.width) {
	   	thumb.style.left = sliderBox.width - Math.ceil(thumbBox.width / 2) + 'px';
	   }
	   else {
	   	let stop = 0;
	   	steps.forEach(function (_, i) {
	   		const curr = steps[i];
	   		const next = i < steps.length ? steps[i + 1] : sliderBox.width;
	   		if (pos > curr && pos < next) {
	   			stop = (pos - curr < (next - curr) / 2) ? curr : next;
	   		}
	   	});
	   	console.log('stop ' + stop);
	   	thumb.style.left = stop - Math.floor(thumbBox.width / 2) + 'px';
	   } */
			}, false);
		}, false);
	}
	moveSlider();

/***/ }

})
//# sourceMappingURL=0.5e1ea422a57b8fe0a456.hot-update.js.map