console.log(" 110 из 110\n  Реализация burger menu на обеих страницах: +26\n Реализация слайдера-карусели на странице Main: +36\n Реализация пагинации на странице Pets: +36\n Реализация попап на обеих страницах: +12");

// бургер-меню

let bodyBur = document.querySelector('body');
let headerMenu = document.querySelector('.header__menu');
let menuBurger = document.querySelector('.burger__menu');
let backBurger = document.querySelector('.burger__back');
bodyBur.addEventListener('click', (i) => {
	let click = i.target;
	if (click.closest('.burger__menu') || (click.closest('.burger-open') && click.closest('.menu__link')) || (click.closest('.burger-open') && !click.closest('.header__menu'))) {
		bodyBur.classList.toggle('burger-open');
		headerMenu.classList.toggle('burger-open');
		menuBurger.classList.toggle('burger-open');
		backBurger.classList.toggle('burger-open');
	}
}
);

// слайдер-карусель

import { pets } from '../../assets/js/pets.js';


let sliderMain = document.querySelector('.ourfriends__slider-main');
let arrowLeft = document.querySelector('.arrow-left');
let arrowRight = document.querySelector('.arrow-right');
let isClick = true;

let arrayNum = [0, 1, 2, 3, 4, 5, 6, 7];

function randomElement() {
	return Math.floor(Math.random() * (8 - 0)) + 0;
};

let a = 3;

function createSlider(finishSliders) {
	let res = [];
	while (res.length < finishSliders) {
		let item = randomElement(arrayNum);
		if (res.indexOf(item) == -1) {
			res.push(item);
		}
	}
	return res;
}

function createCard(elem) {

	 let card = document.createElement('div');
	card.classList.add('ourfriends__card', 'card');
	card.setAttribute('number', elem);
	cardsBox.append(card);
	 let cardPhoto = document.createElement('div');
	cardPhoto.classList.add('card__photo');
	card.append(cardPhoto);
	 let cardImg = document.createElement('img');
	cardImg.src = pets[elem]["img"];
	cardImg.alt = pets[elem].name.toLowerCase();
	cardImg.classList.add('card__img');
	cardPhoto.append(cardImg);
	 let cardName = document.createElement('div');
	cardName.classList.add('card__name', 'name');
	cardName.textContent = pets[elem].name;
	card.append(cardName);
	let cardBox = document.createElement('a');
	cardBox.href = ('#popup');
	cardBox.classList.add('card__button', 'popup-link');
	cardBox.id = ('more');
	card.append(cardBox);
	 let cardButton = document.createElement('div');
	cardButton.classList.add('card__text-button');
	cardButton.textContent = 'Learn more';
	cardBox.append(cardButton);
}
let cardsBox;
function createSlide(arr, posit) {
	cardsBox = document.createElement('div');
	cardsBox.classList.add('ourfriends__cards');
	if (posit == 'left') {
		cardsBox.style.left = -1080 + 'px';
		sliderMain.prepend(cardsBox)
	} else if (posit == 'right') {
		cardsBox.style.left = a * 360 + 'px';
		sliderMain.append(cardsBox)
	} else {
		cardsBox.style.left = 0;
		sliderMain.append(cardsBox);
	}

	drawSlider(arr)
}
let newArraySlide = createSlider(a);
function drawSlider(arr) {
	arr.forEach((i) => {
		createCard(i);
	})
}
createSlide(newArraySlide);
function takeSlider() {
	let sliderMain = document.querySelectorAll('.ourfriends__card');
	return sliderMain;
}
function createAdditionSlider(posit) {
	let sliderItems = takeSlider();
	let slidersIds = [];
	sliderItems.forEach(i => {
		slidersIds.push(+i.getAttribute('number'));
	})
	let sliderId;
	if (posit == 'left') {
		sliderId = slidersIds.slice(0, a);
	} else if (posit == 'right') {
		sliderId = slidersIds.slice(-a);
	}
	let addSlider = [];
	while (addSlider.length < a) {
		let item = randomElement(arrayNum); {
			if (addSlider.indexOf(item) == -1 && sliderId.indexOf(item) == -1) {
				addSlider.push(item);
			}
		}
	}
	createSlide(addSlider, posit);
}
createAdditionSlider('left');
createAdditionSlider('right');
function takeSlidesContainer() {
	let abc = document.querySelectorAll('.ourfriends__cards');
	return abc;
}
arrowLeft.addEventListener('click', b => {
	if (isClick) {
		isClick = false;

		takeSlidesContainer().forEach(i => {
			i.style.left = parseInt(i.style.left, 10) + 1080 + 'px';
		});
		createAdditionSlider('left');

		while (takeSlidesContainer().length > 3) {
			sliderMain.removeChild(document.querySelector('.ourfriends__cards:nth-last-child(1)'))
		}
		sliderMain.addEventListener('animationend', b => {
			isClick = true;
		})
	}
})
arrowRight.addEventListener('click', b => {
	if (isClick) {
		isClick = false;
		takeSlidesContainer().forEach(i => {
			i.style.left = parseInt(i.style.left, 10) - 1080 + 'px';
		});
		createAdditionSlider('right');
		while (takeSlidesContainer().length > 3) {
			sliderMain.removeChild(document.querySelector('.ourfriends__cards:nth-child(1)'))
		}
		sliderMain.addEventListener('animationend', b => {
			isClick = true;
		})
	}
})
window.addEventListener('resize', b => {
	let x = sliderMain.clientWidth
})


// поп-ап



function createPop(i) {
	const popup = document.createElement("div");
	popup.classList.add("popup");
	popup.innerHTML = `
	<div class="popup__box">
	   <div class="popup__content">
		   <a href="##" class="popup__close close-popup">
			   <div class="popup__close-text">+</div>
			</a>
			<div class="popup__card">
		   	<div class="popup__img-box">
					<img class="popup__img" src=${i.img} alt=${i.name}>
		   	</div>
		   	<div class="popup__info">
			   	<div class="popup__title">${i.name}</div>
					<div class="popup__name">${i.type} - ${i.breed}</div>
					<div class="popup__text">${i.description}</div>
					<ul class="popup__menu">
						<li class="popup__block popup__age-title">Age:<span class="popup__age-text block-text"> ${i.age}</span></li>
						<li class="popup__block popup__inoculations-title">Inoculations:<span class="popup__inoculations-text block-text"> ${i.inoculations}</span></li>
				  		<li class="popup__block popup__diseases-title">
						Diseases:<span class="popup__diseases-text block-text">${i.diseases}</span></li>
				   	<li class="popup__block popup__parasites-title">Parasites:<span class="popup__parasites-text block-text">${i.parasites}</span> </li>
			   	</ul>
				
			   </div>
		   </div>
	   </div>
   </div>	`;

	return popup;
}

let body = document.querySelector('body');

document.body.addEventListener("click", (event) => {
	let target, petInfo;

	if (event.target.closest(".ourfriends__card")) {
		target = event.target
			.closest(".ourfriends__card")
			.querySelector(".card__name").innerText;
		petInfo = pets.find((item) => item.name === target);
		document.body.append(createPop(petInfo));

		body.style.overflow = "hidden";
		let popupOpen = document.querySelector('.popup');

		popupOpen.classList.add('open');
	} else if (
		event.target.closest(".close-popup") ||
		!event.target.closest(".popup__content")


	) {
		closePop();
	} else return;
});


const closePop = () => {
	const popup = document.querySelector(".popup");

	if (popup) {
		popup.remove()
		body.style.overflow = "auto";

	}
};
