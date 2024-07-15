'use strict'


// Прелоадер
const preloader = document.querySelector('#preloader')

window.onload = () => {
	preloader.classList.add('preloader--hidden')
}

// Меню
const 
	body = document.body,
	header = document.querySelector('.header'),
	menu = document.querySelector('.header__menu'),
	burger = document.querySelector('.burger'),
	navButtons = document.querySelector('.header__buttons'),
	dropLinks = document.querySelectorAll('.nav__link--drop'),
	searchOpen = document.querySelector('#search-btn'),
	searchWindow = document.querySelector('.search'),
	searchOverlay = document.querySelector('.search__overlay'),
	searchClose = document.querySelector('#search-closebtn'),
	searchInput = document.querySelector('.search__input'),
  searchResults = document.querySelector('.search__results'),
  searchResultsContent = document.querySelector('.search__results-content'),
  searchResultsNothing = document.querySelector('.search__results-nothing'),
  searchShowMoreBtn = document.querySelector('#search-showmore'),
  searchResultsList = document.querySelector('.search__results-list')

burger.addEventListener('click', () => {
	burger.classList.toggle('active')
	navButtons.classList.toggle('active')
	menu.classList.toggle('header__menu--open')
	body.classList.toggle('lock')
})

dropLinks.forEach(item => {
	item.addEventListener('click', () => {
		item.classList.toggle('active')
		item.nextElementSibling.classList.toggle('open')
	})
})

searchOpen.addEventListener('click', () => {
	body.classList.add('lock')
	searchWindow.classList.add('open')
	searchInput.focus()
})

searchClose.addEventListener('click', () => {
	body.classList.remove('lock')
	searchWindow.classList.remove('open')
})

searchOverlay.addEventListener('click', () => {
	body.classList.remove('lock')
	searchWindow.classList.remove('open')
})

searchInput.addEventListener('input', () => {
	if (searchInput.value.trim() !== '') {
		searchResults.classList.add('active')
	} else {
		searchResults.classList.remove('active')
	}

	if (searchInput.value.trim() === 'блаблабла') {
			searchResultsContent.classList.add('hidden');
			searchResultsNothing.classList.add('active');
	} else {
			searchResultsContent.classList.remove('hidden');
			searchResultsNothing.classList.remove('active');
	}
})

searchShowMoreBtn.addEventListener('click', () => {
	searchResultsList.classList.add('added')
	searchShowMoreBtn.style.display = 'none'
})


const clearBtn = document.createElement('button');

clearBtn.classList.add('clear-btn');
searchInput.parentNode.appendChild(clearBtn);

clearBtn.addEventListener('click', (e) => {
  e.preventDefault()
	searchInput.value = ''
	searchInput.focus()
	searchResults.classList.remove('active')
	searchResultsContent.classList.remove('hidden')
	searchResultsNothing.classList.remove('active')
	clearBtn.style.display = 'none'
});

// Обновляем видимость кнопки очистки в зависимости от содержимого поля
searchInput.addEventListener('input', () => {
	clearBtn.style.display = searchInput.value ? 'inline' : 'none'
});

// Начальная установка видимости кнопки очистки
clearBtn.style.display = searchInput.value ? 'inline' : 'none'


// Карусель проектов
const swiperCases = new Swiper('.swiper-cases', {
	// slidesPerView: 1,
	// autoplay: true,
	loop: true,
	// autoHeight: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  navigation: {
    nextEl: '.cases__btnnext',
    prevEl: '.cases__btnprev',
  },
})

// Табы
const 
	tabs = document.querySelector('.tabs'),
	tabItem = document.querySelectorAll('.tab-btn'),
	tabContent = document.querySelectorAll('.tab-content')

if (tabs) {
	tabItem.forEach(function (element) {
		element.addEventListener('click', open)
	})

	function open(evt) {
		const tabTarget = evt.currentTarget
		const button = tabTarget.dataset.button

		tabContent.forEach(function (content) {
			if (content.id !== button) {
				content.classList.remove('active')
			}
		})

		tabItem.forEach(function (item) {
			if (item !== tabTarget) {
				item.classList.remove('active')
			}
		})

		tabTarget.classList.toggle('active')
		document.querySelector(`#${button}`).classList.toggle('active')
	}
}

// init wow.js
const wow = new WOW({ 
	boxClass: 'wow',
	animateClass: 'animate',
	offset: '80',
	mobile: false,
}) 

wow.init( )