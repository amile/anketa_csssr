function clearSelection() {
	if (window.getSelection) {
		window.getSelection().removeAllRanges();
	}
	else {
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
		const steps = [];
		let prev = 0;
		const shiftX = 3; // Смещение точки остановки бегунка относительно начала элемента.
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
		const left = this.steps[2] - Math.floor(this.thumb.offsetWidth / 2) + 'px';
		this.thumb.style.left = left;
	};
	this.deltaX = 0;
}
Slider.prototype.moveThumb = function (targetX) {
	if (targetX - this.deltaX < this.sliderBox.left - this.thumbBox.width / 2) {
		this.thumb.style.left = 0 - Math.floor(this.thumbBox.width / 2) + 'px';
	}
	else if ((targetX + (this.thumbBox.width / 2) - this.deltaX) > (this.sliderBox.right)) {
		this.thumb.style.left = this.sliderBox.width - Math.ceil(this.thumbBox.width / 2) + 'px';
	}
	else {
		this.thumb.style.left = targetX - this.sliderBox.left - this.deltaX + 'px';
	}
};
Slider.prototype.stopThumb = function (pos) {
	if (pos < 0) {
		this.thumb.style.left = 0 - Math.floor(this.thumbBox.width / 2) + 'px';
	}
	else if (pos > (this.sliderBox.width)) {
		this.thumb.style.left = this.sliderBox.width - Math.ceil(this.thumbBox.width / 2) + 'px';
	}
	else {
		let stop = 0;
		const steps = this.steps;
		steps.forEach(function (_, i) {
			const curr = steps[i];
			const next = i < steps.length ? steps[i + 1] : this.sliderBox.width;
			if (pos > curr && pos < next) {
				stop = (pos - curr < (next - curr) / 2) ? curr : next;
			}
		});
		this.thumb.style.left = stop - Math.floor(this.thumbBox.width / 2) + 'px';
	}
};

const slider = new Slider();
slider.initialThumbPoint();

slider.thumb.addEventListener('mousedown', function (eventDown) {
	slider.thumbBox = this.getBoundingClientRect();
	slider.deltaX = eventDown.clientX - slider.thumbBox.left;
	function moveHandler(eventMove) {
		const targetX = eventMove.pageX;
		slider.moveThumb(targetX);
	}
	function upHandler(eventUp) {
		clearSelection();
		document.removeEventListener('mousemove', moveHandler, false);
		const pos = eventUp.pageX - slider.sliderBox.left;
		slider.stopThumb(pos);
		document.removeEventListener('mouseup', upHandler, false);
	}
	document.addEventListener('mousemove', moveHandler, false);
	document.addEventListener('mouseup', upHandler, false);

}, false);

slider.thumb.addEventListener('touchstart', function (eventDown) {
	eventDown.preventDefault();
	slider.thumbBox = slider.thumb.getBoundingClientRect();
	slider.deltaX = eventDown.targetTouches[0].clientX - slider.thumbBox.left;
	function moveHandler(eventMove) {
		if (eventMove.target.className === 'slider__thumb') {
			const targetX = eventMove.targetTouches[0].pageX;
			slider.moveThumb(targetX);
		}
	}
	function upHandler(eventUp) {
		if (eventUp.target.className === 'slider__thumb') {
			document.removeEventListener('touchmove', moveHandler, false);
			const pos = eventUp.changedTouches[0].pageX - slider.sliderBox.left;
			slider.stopThumb(pos);
		}
		document.removeEventListener('touchend', upHandler, false);
	}
	document.addEventListener('touchmove', moveHandler, false);
	document.addEventListener('touchend', upHandler, false);
}, {passive: false, capture: false});
