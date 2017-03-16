function moveSlider() {
	const slider = document.getElementsByClassName('slider')[0];
	const thumb = document.getElementsByClassName('slider__thumb')[0];
	const sliderElements = document.getElementsByClassName('slider__item');
	let steps = [];
	let prev = 0;
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
		const sliderBox = slider.getBoundingClientRect();
		const thumbBox = thumb.getBoundingClientRect();
		const deltaX = eventDown.pageX - thumbBox.left;
		const prevOnMouseMove = document.onmousemove;
		const prevOnMouseUp = document.onmouseup;
		document.onmousemove = function (eventMove) {
			if (eventMove.pageX - deltaX < sliderBox.left - thumbBox.width / 2) {
				thumb.style.left = 0 - Math.floor(thumbBox.width / 2) + 'px';
			}
			else if (eventMove.pageX + thumbBox.width / 2 - deltaX > sliderBox.right) {
				thumb.style.left = sliderBox.width - Math.ceil(thumbBox.width / 2) + 'px';
			}
			else {
				thumb.style.left = eventMove.pageX - sliderBox.left - deltaX + 'px';
			}
		};
		document.onmouseup = function (eventUp) {
			/* if (!window.getSelection) {
					document.selection.empty();
			} */
			const pos = eventUp.pageX - sliderBox.left;
			if (pos < 0) {
				thumb.style.left = 0 - Math.floor(thumbBox.width / 2) + 'px';
			}
			else if (pos > sliderBox.width) {
				thumb.style.left = sliderBox.width - Math.ceil(thumbBox.width / 2) + 'px';
			}
			else {
				let stop = 0;
				steps.forEach(function (_, i) {
					let curr = steps[i];
					let next = i < steps.length ? steps[i + 1] : sliderBox.width;
					if (pos > curr && pos < next) {
						stop = (pos - curr < (next - curr) / 2) ? curr : next;
					}
				});
				thumb.style.left = stop - thumbBox.width / 2 + 'px';
			}
			document.onmousemove = prevOnMouseMove;
			document.onmouseup = prevOnMouseUp;
		};
	};
}
moveSlider();

