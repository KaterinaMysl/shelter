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

// пагинация

import { pets } from '../../assets/js/pets.js';

let sliderMain = document.querySelector('.ourfriends__slider');

let arrayNum = [0, 1, 2, 3, 4, 5, 6, 7];


function random(array) {
	let res = [...array];
	for (let i = res.length - 1; i > 0; i--) {
		let z = Math.floor(Math.random() * (i + 1));
		[res[i], res[z]] = [res[z], res[i]];
	}
	return res
}

let resultArr = [];

while (resultArr.length < 6) {
	resultArr.push(random(arrayNum))
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

function drawSlider() {
	resultArr.forEach((em, i) => {
		cardsBox = document.createElement('div');
		cardsBox.classList.add('ourfriends__cards');
		if (i == 0) {
			cardsBox.classList.add('active')
		};
		em.forEach(e => {
			createCard(e);
		})
		sliderMain.append(cardsBox);
	})
}

drawSlider()


function pageClide() {
	return document.querySelectorAll('.ourfriends__cards');
}

const allLeftButton = document.querySelector('.b-left-all');
const leftButton = document.querySelector('.b-left');

const buttonNumber = document.querySelector('.b-center');

const rightButton = document.querySelector('.b-right');
const allRightButton = document.querySelector('.b-right-all');



function activeSl() {
	pageClide()[pageClide().length - 1].classList.add('active');
	buttonNumber.innerHTML = pageClide().length;
}

function checkButtons() {
	let number = +buttonNumber.textContent;



	if (number == pageClide().length) {
		allRightButton.classList.remove('active');
		allRightButton.classList.add('inactive');

		rightButton.classList.remove('active');
		rightButton.classList.add('inactive');


	} else {
		allRightButton.classList.add('active');
		allRightButton.classList.remove('inactive');

		rightButton.classList.add('active');
		rightButton.classList.remove('inactive');

	}
	if (number == 1) {
		allLeftButton.classList.add('inactive');
		allLeftButton.classList.remove('active');

		leftButton.classList.remove('active');

		leftButton.classList.add('inactive');

	} else {
		allLeftButton.classList.remove('inactive');
		allLeftButton.classList.add('active');

		leftButton.classList.remove('inactive');

		leftButton.classList.add('active');

	}
}




allLeftButton.addEventListener('click', e => {
	pageClide().forEach(el => {
		el.classList.remove('active');
	})
	pageClide()[0].classList.add('active');
	buttonNumber.innerHTML = 1;
	checkButtons();
})

leftButton.addEventListener('click', e => {
	if (!pageClide()[0].classList.contains('active')) {
		for (let i = 0; i < pageClide().length; i++) {
			if (pageClide()[i].classList.contains('active')) {
				 pageClide()[i].classList.remove('active');
				     pageClide()[i - 1].classList.add('active');
				       buttonNumber.innerHTML = i;
				break
			}
		}
		checkButtons();
	}
})

allRightButton.addEventListener('click', e => {
	pageClide().forEach(el => {
		el.classList.remove('active');
	})
	pageClide()[pageClide().length - 1].classList.add('active');
	buttonNumber.innerHTML = pageClide().length;
	checkButtons();
})

rightButton.addEventListener('click', e => {
	if (!pageClide()[pageClide().length - 1].classList.contains('active')) {
		for (let i = 0; i < pageClide().length; i++) {
			if (pageClide()[i].classList.contains('active')) {
				pageClide()[i].classList.remove('active');
				    pageClide()[i + 1].classList.add('active');
				     buttonNumber.innerHTML = i + 2;
				break
			}
		}
		checkButtons();
	}
})


window.addEventListener('resize', e => {
	if (window.innerWidth <= '969' && window.innerWidth > '639') {
		if (pageClide().length < 8) {
			while (pageClide().length < 8) {
				cardsBox = document.createElement('div');
				cardsBox.classList.add('ourfriends__cards');
				sliderMain.append(cardsBox);
			}

			for (let i = 0; i < pageClide().length - 1; i++) {
				while (pageClide()[i].children.length > 6) {
					let noCard = pageClide()[i].removeChild(pageClide()[i].lastChild);
					pageClide()[i + 1].insertBefore(noCard, pageClide()[i + 1].firstChild);
				}
			}
			checkButtons()
		} else if (pageClide().length > 8) {
			for (let i = pageClide().length - 1; i > 7; i--) {
				while (pageClide()[i].children.length > 0) {
					let noCard = pageClide()[i].removeChild(pageClide()[i].firstChild);
					pageClide()[i - 1].appendChild(noCard);
				}
				if (pageClide()[i].classList.contains('active')) {
					pageClide()[i].remove()
					activeSl()
				} else {
					pageClide()[i].remove()
				}
				checkButtons()
			}
			for (let i = pageClide().length - 1; i > -1; i--) {
				while (pageClide()[i].children.length > 6) {

					let noCard = pageClide()[i].removeChild(pageClide()[i].firstChild);
					pageClide()[i - 1].appendChild(noCard);
				}
			}
		}
	} else if (window.innerWidth <= '639') {
		if (pageClide().length < 16) {
			while (pageClide().length < 16) {
				cardsBox = document.createElement('div');
				cardsBox.classList.add('ourfriends__cards');
				
				sliderMain.append(cardsBox);
			}
			for (let i = 0; i < pageClide().length - 1; i++) {
				while (pageClide()[i].children.length > 3) {
					let noCard = pageClide()[i].removeChild(pageClide()[i].lastChild);
					pageClide()[i + 1].insertBefore(noCard, pageClide()[i + 1].firstChild);
				}
			}
			checkButtons()
		}




	} else if (window.innerWidth > '969') {
		if (pageClide().length > 6) {
			for (let i = pageClide().length - 1; i > 5; i--) {
				while (pageClide()[i].children.length > 0) {
					let noCard = pageClide()[i].removeChild(pageClide()[i].firstChild);
					pageClide()[i - 1].appendChild(noCard);
				}
				if (pageClide()[i].classList.contains('active')) {
					pageClide()[i].remove()
					activeSl()
				} else {
					pageClide()[i].remove()
				}
				checkButtons()
			}
			for (let i = pageClide().length - 1; i > -1; i--) {
				while (pageClide()[i].children.length > 8) {
					let noCard = pageClide()[i].removeChild(pageClide()[i].firstChild);
					pageClide()[i - 1].appendChild(noCard);
				}
			}
			checkButtons()
		}
	}
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
		const popup = document.querySelector(".popup");
		
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

