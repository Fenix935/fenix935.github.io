window.addEventListener('DOMContentLoaded',function () {
	const mapSlider = document.querySelector('.map__slider'),
		  viewSlider = document.querySelector('.view__slider'),
		  mapBtnLeft = document.querySelector('.map__left'),
		  mapBtnRight = document.querySelector('.map__right'),
		  viewLeft = document.querySelector('.view__left'),
		  viewRight = document.querySelector('.view__right');

	let step = 0;
	let step2 = 0;
	let endTime = '2020-09-18';
	let videoLink = `
		<iframe src="https://www.youtube.com/embed/6CSyVxdaAVs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
	`;
	const changeFoto = (fotos,iteam) =>{
		const foto = document.querySelectorAll(fotos),
			  mainFoto  = document.querySelector(iteam);

		for(let i = 0; i < foto.length; i++){
			if(foto[i].classList.length == 1){
				foto[i].addEventListener('click',clickFoto);
			}
		}
		function clickFoto(e) {
			mainFoto.setAttribute('src', e.target.src) 
		}
	};
	changeFoto('.slider__iteam','#main__foto')

	const modal = (selector) =>{
		const icon = document.querySelector(selector),
			  modal = document.querySelector('.modal'),
			  close = document.querySelector('.close');

		if(icon.classList.length == 2){
			icon.addEventListener('click', openModal);
			close.addEventListener('click', closeModal);

			function openModal(){
				modal.style.display = 'block';
				document.body.style.overflow = 'hidden';

				modal.querySelector('.video__block').innerHTML = videoLink;

				modal.querySelector('.modal__iteam').style.width = '100%';
				modal.querySelector('.modal__iteam').style.height = '100%';
			}
			function closeModal(){
				modal.querySelector('.video__block').innerHTML = '';

				modal.style.display = 'none';
				document.body.style.overflow = 'auto';
			}

		}else{

			const foto = icon.previousElementSibling;

			icon.addEventListener('click', openModal);
			close.addEventListener('click', closeModal);

			function openModal(){
				modal.style.display = 'block';
				document.body.style.overflow = 'hidden';

				console.log(modal.querySelector('.load'))

				img = document.createElement('img');
				img.setAttribute('src',foto.getAttribute('src'))
				img.classList.add('big__foto');

				modal.querySelector('.video__block').append(img);

			}
			function closeModal(){
				document.querySelector(".big__foto").remove()

				modal.style.display = 'none';
				document.body.style.overflow = 'auto';
			}
		}
			
	};
	modal('.map__foto_icon');
	modal('.slider__iteam');

	const moveSlide = (iteam,btn,btn2,move) => {
		let foto = iteam.children,
			styles = foto[0].currentStyle || window.getComputedStyle(foto[0]),
		    stepsum = Math.round(foto[0].clientWidth + (+styles.marginRight.replace(/px/g, '')));
		let maxSlide;

		if(window.innerHeight <= 426){
			maxSlide = Math.round(iteam.clientWidth - (1 * stepsum));
		}else{
			maxSlide = Math.round(iteam.clientWidth - (4 * stepsum));
		}
		btn.addEventListener('click', moveLeft);
		btn2.addEventListener('click', moveRight);

		function moveRight(){
		console.log(maxSlide)
			move += -stepsum;
			if(move <= -maxSlide){
				move = -maxSlide;
			}
			console.log(move)

			iteam.style.transform = 'translateX(' + move + 'px)';
		}

		function moveLeft(){
			move += stepsum;
			if(move >= 0){
				move = 0;
			}


			console.log(move)
			iteam.style.transform = 'translateX(' + move + 'px)';
		}
	};

	moveSlide(mapSlider,mapBtnLeft,mapBtnRight,step);
	moveSlide(viewSlider,viewLeft,viewRight,step2);

	if(!document.querySelector('.clock__days #day')) return;

	const addZero = (num) =>{
		if(num <= 9){
			return "0" + num;
		}else{
			return num;
		}
	}

	const getTimeRemaining = (endTime) =>{
		const t = Date.parse(endTime) - Date.parse(new Date()),
		  	  minutes = Math.floor((t/1000/60) % 60),
		  	  hours = Math.floor((t/(1000 * 60 * 60)) % 24),
		  	  days = Math.floor((t/(1000 * 60 * 60 * 24)));

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes
		};
	};
	const setClock = (selector,endTime) =>{
		const timer = document.querySelector(selector),
			  days = timer.querySelector('.clock__days #day'),
			  hour = timer.querySelector('.clock__days #hour'),
			  minutes = timer.querySelector('.clock__days #min'),
			  timeInterval = setInterval(updateClock,1000);

		updateClock();
		function updateClock(){
			const t = getTimeRemaining(endTime);

			days.textContent = addZero(t.days);
			hour.textContent = addZero(t.hours);
			minutes.textContent = addZero(t.minutes);

			if(t.total <= 0){
				days.textContent = "00";
				hour.textContent = "00";
				minutes.textContent = "00";

				clearInterval(timeInterval);
			}
		}
	};
	setClock('.top__box2_clock',endTime);

});