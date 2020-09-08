window.addEventListener('DOMContentLoaded',function() {
	const headBox = document.querySelectorAll('.head__box'),
		  numberHide = document.querySelectorAll('.number__hide'),
		  headInput = document.querySelector('#head__input'),
		  tabs = document.querySelectorAll('.tab'),
		  content = document.querySelectorAll('.choose__content'),
		  contact = document.querySelectorAll('.head__contact'),
		  contactHide = document.querySelectorAll('.contact__hide'),
		  sliderShow  = document.querySelectorAll('.intro__slider');

	let sliderContent;


	const searchInput = () => {
		headInput.parentElement.classList.add('active');
		headInput.parentElement.querySelector('#close__input').src = 'img/close.svg';

		document.querySelector('.black__over').classList.add('show__over');
		document.body.style.overflow = 'hidden';

		headInput.parentElement.querySelector('#close__input').addEventListener('click',closeInput);

		function closeInput(){
			headInput.parentElement.classList.remove('active');
			headInput.parentElement.querySelector('#close__input').src = 'img/loupe.svg';
			headInput.value = '';

			document.querySelector('.black__over').classList.remove('show__over');
			document.body.style.overflow = 'auto';
		};
	};

	const showHide = (iteam,iteam2) => {
		for(let i = 0; i < iteam2.length; i++){
			iteam2[i].addEventListener('click',() => {
				show(i)
			});
		}

		function show (i) {
			iteam2[i].querySelector('img:not(.vodafone__icon)').style.transform = 'rotate(-180deg)'

			iteam[i].style.display = 'block';

			document.querySelector('.black__over').classList.add('show__over');
			document.body.style.overflow = 'hidden';

			setTimeout(function() {
				iteam[i].classList.add('show');
			},50); 
		}
		
	};
	const changeTab = (e,index) => {
		for(let i = 0; i < tabs.length; i++){
			tabs[i].classList.remove('active__tab');
			content[i].classList.add('hide');
		}
		e.target.classList.add('active__tab');
		content[index].classList.remove('hide');
	};

	showHide(numberHide,headBox);
	showHide(contactHide,contact);
	showHide(contactHide,contact);

	headInput.addEventListener('focus',searchInput);

	for(let i = 0; i < tabs.length; i++){
		tabs[i].addEventListener('click',(e) => {
			changeTab(e,i);
		});
	}

	document.body.addEventListener('click',(e) => {
		if(e.target.id !== 'phone' && e.target.id !== "foto" && e.target.className !== 'rotate'){
			if(e.target.parentElement.classList[0] !== 'number__iteam' &&  
		  	e.target.parentElement.classList[0] !== 'number__hide'){
		  		for(let i = 0; i < numberHide.length; i++){
					numberHide[i].style.display = 'none';
					numberHide[i].classList.remove('show');
					headBox[i].querySelector('img:not(.vodafone__icon)').style.transform = 'rotate(0)';
		  		}
			}
		}

		if(e.target.id !== 'head__input'){
			headInput.parentElement.classList.remove('active');
			headInput.parentElement.querySelector('#close__input').src = 'img/loupe.svg';
			headInput.value = '';
		}

		if(e.target.classList[1] === 'show__over' ||
		e.target.className === 'top__head'){
			document.querySelector('.black__over').classList.remove('show__over');
			document.body.style.overflow = 'auto';
		}

		if(e.target.classList[0] !== 'head__contact' &&
			e.target.parentElement.classList[0] !== 'head__contact' && 
			e.target.parentElement.classList[0] !== 'contact__hide'){
			for(let i = 0; i < contactHide.length; i++){
				contactHide[i].style.display = 'none';
				contactHide[i].classList.remove('show');
				contact[i].querySelector('img').style.transform = 'rotate(0)';
			}
		}
	});

	const footShow = (iteam,iteam2,clas = false) =>{
		const clickBlock = document.querySelectorAll(iteam),
			  showBlock = document.querySelectorAll(iteam2);

		for(let i = 0; i < clickBlock.length; i++){
			clickBlock[i].addEventListener('click',function(){
				openFoot(i)
			});
		}

		function openFoot (i) {
			if(clas == true){
				clickBlock[i].classList.toggle('active__menu')
			}

			if(showBlock[i].clientHeight > 0){
				showBlock[i].style.display = 'none';
				showBlock[i].style.height = '0';
				clickBlock[i].querySelector('img').style.transform = 'rotate(0)';
			}else{
				for(let i = 0; i < showBlock.length; i++){
					showBlock[i].style.display = 'none';
					clickBlock[i].querySelector('img').style.transform = 'rotate(0)';
				}
				showBlock[i].style.display = 'block';
				clickBlock[i].querySelector('img').style.transform = 'rotate(-180deg)';

				setTimeout(function(){
					showBlock[i].style.height = 'auto';
				},10)
			}
		}

	};

	footShow('.media__foot_iteam','.media__foot_hide');
	footShow('.media__map_iteam','.media__map_hide');
	footShow('.media__head_burger','.media__modal', true);

	if(window.innerWidth <= 1150){
		footShow('.tab','.tab__hide');
	}
	const viewMore = (iteam,iteam2,btn = false) => {
		const pressBtn = document.querySelector(iteam),
			  textBox = document.querySelector(iteam2);

		pressBtn.addEventListener('click',open);

		function open () {
			textBox.classList.toggle('open');
			if(btn === false){
				if(pressBtn.textContent === "Читать далее"){
					pressBtn.textContent = "Скрыть";
					pressBtn.parentElement.querySelector('img').style.transform = 'rotate(-180deg)';
				}else if(pressBtn.textContent === "Скрыть"){ 
					pressBtn.textContent = "Читать далее";
					pressBtn.parentElement.querySelector('img').style.transform = 'rotate(0)';
				}
			}
		}
	};

	viewMore('.about__view_more span','.about__text');
	viewMore('#view__more','.blog__text', true);
});