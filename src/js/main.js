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
let currentUrl = window.location.href

const 
	tabs = document.querySelector('.tabs'),
	accordion = document.querySelector('.accordion'),
	tabItem = document.querySelectorAll('.tab-target'),
	tabContent = document.querySelectorAll('.tab-body'),
	pageParams = new URLSearchParams(window.location.search),
	pageReferrer = pageParams.get('t')

if (tabs) {
	tabItem.forEach(function (element) {
		element.addEventListener('click', open)
	})

	function open(evt) {
		const tabTarget = evt.currentTarget
		const button = tabTarget.dataset.button
		const tabTargetData = tabTarget.getAttribute("data-button")
		
		tabItem.forEach(function (item) {
			item.classList.remove('active')
		})
		
		tabTarget.classList.add('active')
		
		if (pageReferrer) {
			if (currentUrl.includes('?t')) {
				currentUrl = currentUrl.replace(/t=[^&]*/, `t=${tabTargetData}`);
			} else {
				currentUrl += `?t=${tabTargetData}`;
			}
		}
		
		window.history.pushState({ path: currentUrl }, '', currentUrl);

		tabContent.forEach(function (item) {
			item.classList.remove('active')
		})
		
		document.querySelector(`#${button}`).classList.add('active')
	}

	if (pageReferrer) {
		document.querySelector(`.tab-target[data-button="${pageReferrer}"]`).click()
	} else {
		tabItem[0].click()
	}
}

if (accordion) {
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


// Fancybox
Fancybox.bind("[data-fancybox]", {
	Toolbar: {
		display: {
			left: [],
			middle: [],
			right: ["close"],
		},
	},
})


// init wow.js
// const wow = new WOW({ 
// 	boxClass: 'wow',
// 	animateClass: 'animate',
// 	offset: '80',
// 	mobile: false,
// }) 

// wow.init( )


// Swiper nowrap
const swiperTapeItems = document.querySelectorAll('.swiper-tape');

if (swiperTapeItems) {
	swiperTapeItems.forEach(item => {
		const swiperTape = new Swiper('.swiper-tape', {
			slidesPerView: 'auto',
			freeMode: true,
			// mousewheel: {enabled: true},
		})
	})
}

// Swiper gallery
const swiperGalleryItems = document.querySelectorAll('.swiper-gallery');

if (swiperGalleryItems) {
	swiperGalleryItems.forEach(item => {
		const swiperGallery = new Swiper('.swiper-gallery', {
			spaceBetween: 20,
			pagination: {
				el: '.swiper-gallery-pagination',
			},
			navigation: {
				nextEl: '.swiper-gallery-button-next',
				prevEl: '.swiper-gallery-button-prev',
			},
		})
	})
}

// Форма обратной связи

const select = function () {
	let selectHeader = document.querySelectorAll('.custom-select__input'),
		selectItem = document.querySelectorAll('.custom-select__item')

	selectHeader.forEach(item => {
		item.addEventListener('click', selectToggle)
	})

	selectItem.forEach(item => {
		item.addEventListener('click', selectChoose)
	})

	function selectToggle() {
		this.parentElement.classList.toggle('active')
	}

	function selectChoose() {
		let text = this.innerText,
			select = this.closest('.custom-select'),
			// подменный инпут для выбора значения
			currentText = select.querySelector('.custom-select__current'),
			// скрытый инпут для передачи выбранного значения
			selectedInput = select.parentElement.querySelector('.selected_value')

		currentText.innerText = text
		selectedInput.value = text
		select.classList.remove('active')

		selectItem.forEach(item => {
			item.classList.remove('selected')
		})

		this.classList.add('selected')
	}
}

select()

const formRegister = document.querySelector('.feedback__content'),
			formSuccess = document.querySelector('.feedback__success'),
			formSubmitBtn = document.querySelector('.feedback__submit'),
			form = document.querySelector('.feedback')

if(form) {
	formSubmitBtn.addEventListener('click', () => {
		formRegister.style.display = 'none'
		formSuccess.style.display = 'block'
	})
}

function init() {
  // Инициализация карты с id="ymap"
  if (document.querySelector('#ymap')) {
    const ymap = new ymaps.Map('ymap', {
      center: [56.178288, 37.902758],
      zoom: 14,
      controls: ['zoomControl'],
    })
    // Добавление метки на карту
    ymap.geoObjects.add(
			new ymaps.Placemark(
				[56.178288, 37.902758],
				{
					balloonContentHeader: 'Усадьба Мураново',
					balloonContentBody: '141250, Московская область, Пушкинский городской округ, деревня Мураново',
					hintContent: 'Усадьба Мураново',
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'https://weblazum.ru/muranovo/img/icons/placemark.svg',
					iconImageSize: [34, 44],
					iconImageOffset: [-19, -24],
					iconCaption: ''
				}
			)
		)
	}
}

// Ожидание загрузки библиотеки Яндекс.Карт
if (document.querySelector('.ymap')) {
  ymaps.ready(init)
}

// карта объектов
if (document.querySelector('#object-map')) {
	console.log(window.innerWidth)

	var myElement = document.querySelector('.map-wrapper');

	let isMouseLeftButtonDown = false;
	let lastMouseX = 0;
	let lastMouseY = 0;

	myElement.addEventListener('mousedown', function(event) {
		if (event.button === 0) { // Левая кнопка мыши
			isMouseLeftButtonDown = true;
			lastMouseX = event.clientX; // Запоминаем начальное положение мыши по оси X
			lastMouseY = event.clientY; // Запоминаем начальное положение мыши по оси Y

			// Запрещаем контекстное меню при зажатии левой кнопки мыши
			event.preventDefault();
		}
	});

	myElement.addEventListener('mouseup', function(event) {
		if (event.button === 0) {
			isMouseLeftButtonDown = false;
		}
	});

	myElement.addEventListener('mousemove', function(event) {
		if (isMouseLeftButtonDown) {
			// Рассчитываем разницу в положении мыши и инвертированно прокручиваем содержимое элемента
			const deltaX = lastMouseX - event.clientX;
			const deltaY = lastMouseY - event.clientY;

			myElement.scrollLeft += deltaX;
			myElement.scrollTop += deltaY;

			// Обновляем положение мыши
			lastMouseX = event.clientX;
			lastMouseY = event.clientY;

			//console.log(event.clientX, event.clientY);
		}
	});
}

const objectMapAreas = document.querySelectorAll('area[data-object]'),
			objectMapItems = document.querySelectorAll('.objects__item')

objectMapAreas.forEach(area => {
	area.addEventListener('click', function() {
		const objectId = this.getAttribute('data-object');
		const targetItem = document.getElementById(objectId);

		objectMapItems.forEach(item => item.classList.remove('active'));

		if (targetItem) {
			targetItem.classList.add('active');
		}
	})
})