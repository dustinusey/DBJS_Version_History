/** 
 * darkBoxJS v1.0.0
 * Created by Dustin Usey
 * 
 * https://dustinusey.github.io/DarkBoxJS/
 * 
 * 
 * 
 * https://github.com/dustinusey/DarkBoxJS
 */

/* data arrays */
const dbjs_cap = [];
const dbjs_src = [];
let currentIndex = '';
/* DarkBoxJS */
class DarkBox {
	constructor() {
		this.overlay = false;
	}
	/* overlay creation */
	overlayCreate() {
		const dbjs_gal = document.querySelector('.dbjs_photo_gallery');
		//create new elements
		const overlay = document.createElement('div');
		const div = document.createElement('div');
		const cap = document.createElement('h3');
		// add classes to new elements
		overlay.classList.add('dbjs_overlay');
		dbjs_gal.appendChild(overlay);
		overlay.appendChild(cap);
	}
	/* overlay visibility  */
	handleOverlay() {
		const overlay = document.querySelector('.dbjs_overlay');
		const gal = document.querySelector('.dbjs_photo_gallery');
		if (this.overlay) {
			overlay.style.display = 'flex';
		} else {
			overlay.style.display = 'none';
		}
	}
	/* overlay interaction*/
	handleOverlayClicks(e) {
		const overlay = document.querySelector('.dbjs_overlay');
		if (e.target === overlay) {
			this.overlay = false;
		}
		const img = document.querySelectorAll('.dbjs_image_container img');
		img.forEach((img) => {
			if (e.target === img) {
				this.handleOverlayInfo(e);
			}
		})
		this.handleArrowClicks(e);
	}
	/* overlay info */
	handleOverlayInfo(e) {
		const overlay = document.querySelector('.dbjs_overlay');
		const img = document.querySelectorAll('.dbjs_image_container img');
		img.forEach((img) => {
			if (e.target === img) {
				overlay.innerHTML = `
		<img class="dbjs_full" src="${e.target.getAttribute('src')}">
		<h4>${e.target.parentNode.getAttribute('data-darkbox')}</h4>
		<img class="dbjs_arrow dbjs_left" src="darkboxJS_library/img/leftarrow.png" alt="previous image">
		<img class="dbjs_arrow dbjs_right" src="darkboxJS_library/img/rightarrow.png" alt="nect image">
		`
			}
		});
	}
	/* caption data */
	handleCaptions() {
		const dbjs_img_container = document.querySelectorAll('.dbjs_image_container')
		dbjs_img_container.forEach((cap) => {
			let caption = cap.getAttribute('data-darkbox');
			dbjs_cap.push(caption);
		});
	}
	/* image data */
	handleImgSrc() {
		const dbjs_gal = document.querySelector('.dbjs_photo_gallery');
		const img = dbjs_gal.querySelectorAll('img');
		img.forEach((src) => {
			let imgSrc = src.getAttribute('src');
			dbjs_src.push(imgSrc);
		});
	}
	/* full image resizing */
	handleImageResize(e) {
		const image = document.querySelectorAll('.dbjs_image_container img');
		image.forEach((img) => {
			if (e.target === img) {
				setTimeout(() => {
					const overlay = document.querySelector('.dbjs_overlay');
					const fullImg = document.querySelector('.dbjs_full');
					const caption = overlay.querySelector('h4');
					fullImg.style.width = '75%';
					caption.style.opacity = '1';
				}, 50);
			}
		});
	}
	/* iamge filter functionality */
	handleArrowClicks(e) {
		const arrows = document.querySelectorAll('.dbjs_arrow');
		arrows.forEach((arrow) => {
			if (e.target === arrow) {
				if (e.target.classList.contains('dbjs_right')) {
					currentIndex++;
					this.handleIndexChange();
					this.handleDataFilter();
				} else {
					currentIndex--;
					this.handleIndexChange();
					this.handleDataFilter();
				}
			}
		});
	}
	/* index change */
	handleIndexChange() {
		const img = document.querySelectorAll('.dbjs_image_container');
		const rightArrow = document.querySelector('.dbjs_right');
		const leftArrow = document.querySelector('.dbjs_left');
		if (currentIndex === img.length - 1) {
			rightArrow.classList.add('dbjs_disabled')
			currentIndex = img.length - 1;
		} else {
			rightArrow.classList.remove('dbjs_disabled');
		}
		if (currentIndex === 0) {
			leftArrow.classList.add('dbjs_disabled');
			currentIndex = 0;
		} else {
			leftArrow.classList.remove('dbjs_disabled');
		}
	}
	/* filtering data */
	handleDataFilter() {
		const fullImg = document.querySelector('.dbjs_full');
		const imgCap = document.querySelector('.dbjs_overlay h4');
		fullImg.src = dbjs_src[currentIndex];
		imgCap.textContent = dbjs_cap[currentIndex];
	}
	/* update index */
	handleInitialIndex(e) {
		setTimeout(() => {
			const img = document.querySelectorAll('.dbjs_image_container');
			const rightArrow = document.querySelector('.dbjs_right');
			const leftArrow = document.querySelector('.dbjs_left');
			if (e.target.parentNode === img[0]) {
				currentIndex = 0;
				leftArrow.classList.add('dbjs_disabled');
			} else
				if (e.target.parentNode === img[img.length - 1]) {
					currentIndex = img.length - 1;
					rightArrow.classList.add('dbjs_disabled');
				}
		}, 100)
	}
}
/* listeners */
const dbjs_gal = document.querySelector('.dbjs_photo_gallery');
dbjs_gal.addEventListener('click', (e) => {
	darkBoxJS.handleOverlayClicks(e);
	darkBoxJS.handleOverlay();
	darkBoxJS.handleImageResize(e);
});
dbjs_gal.addEventListener('click', (e) => {
	const img = document.querySelectorAll('.dbjs_image_container img');
	const rightArrow = document.querySelector('.dbjs_right');
	const leftArrow = document.querySelector('.dbjs_left');
	img.forEach((img, index) => {
		if (e.target === img) {
			currentIndex = index;
			darkBoxJS.handleInitialIndex(e);
			darkBoxJS.handleOverlayClicks(e);
			darkBoxJS.handleOverlay();
			darkBoxJS.handleOverlayInfo(e);
			darkBoxJS.overlay = true;
			darkBoxJS.handleOverlay();
		}
	});
});
/* initialization */
let darkBoxJS = new DarkBox();
darkBoxJS.overlayCreate();
darkBoxJS.handleOverlay();
darkBoxJS.handleCaptions();
darkBoxJS.handleImgSrc();

