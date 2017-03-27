webpackHotUpdate(0,{

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
			eventDown.preventDefault();
			var thumbBox = thumb.getBoundingClientRect();
			var deltaX = eventDown.targetTouches[0].clientX - thumbBox.left;
			function moveThumb(eventMove) {
				if (eventMove.target.className === 'slider__thumb') {
					var targetX = eventMove.targetTouches[0].pageX;
					if (targetX - deltaX < sliderBox.left - thumbBox.width / 2) {
						thumb.style.left = 0 - Math.floor(thumbBox.width / 2) + 'px';
					} else if (targetX + thumbBox.width / 2 - deltaX > sliderBox.right) {
						thumb.style.left = sliderBox.width - Math.ceil(thumbBox.width / 2) + 'px';
					} else {
						thumb.style.left = targetX - sliderBox.left - deltaX + 'px';
					}
				}
			}
			document.addEventListener('touchmove', moveThumb, false);
			function stopThumb(eventUp) {
				if (eventUp.target.className === 'slider__thumb') {
					document.removeEventListener('touchmove', moveThumb);
					console.log(eventUp);
					var pos = eventUp.changedTouches[0].pageX - sliderBox.left;
					console.log('pos ' + pos);
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
						console.log('stop ' + stop);
						thumb.style.left = stop - Math.floor(thumbBox.width / 2) + 'px';
					}
				}
			}
			document.addEventListener('touchend', stopThumb, false);
			document.removeEventListener('touchend', stopThumb);
		}, { passive: false });
	}
	moveSlider();

/***/ }

})
//# sourceMappingURL=0.3ed0c28d0e1646ab0321.hot-update.js.map