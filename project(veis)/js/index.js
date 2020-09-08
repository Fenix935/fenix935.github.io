window.addEventListener('DOMContentLoaded',function(){

	const productIteam = document.querySelectorAll('.product__iteam'),
		  introFoto = document.querySelectorAll('.intro__foto'),
		  leftArrow = document.querySelector('.left__arrow'),
		  rightArrow = document.querySelector('.right__arrow'),
		  blogIteam = document.querySelectorAll('.blog__iteam'),
		  blogInner = document.querySelector('.blog__slider'),
		  blogLeft = document.querySelector('.blog__left'),
		  tabs = document.querySelectorAll('.tab'),
		  blogRight = document.querySelector('.blog__right');

	let index = 0;
	let priseKind; 



	if(!leftArrow) return;

	const mouseOn = (index,e) =>{
		if(e.target.className === "product__iteam" ||
		e.target.firstElementChild === "img"){
			let productPrize;

			if(productIteam[index].querySelector('.lowprise__number')){
				productPrize = productIteam[index].querySelector('.lowprise__number');
				productIteam[index].querySelector('.lowprise').classList.add('hide');

				priseKind = "lowprise__hide"
			}else{
				console.log(productIteam[index])
				productPrize = productIteam[index].querySelector('.product__prise');

				priseKind = "product__hide_prise"
			}
			

			productIteam[index].classList.add("active__hover");
			productPrize.remove();
			productIteam[index].querySelector('.product__number').style.marginBottom = "14px";
			productIteam[index].querySelector('.product__text').style.textTransform = 'uppercase';
			

			let perevCont = productIteam[index].innerHTML;
			
			perevCont += `
				<div class="product__hide">
					<div class="product__hide_inner">
						<img class="product__hide_iteam" src="img/hidden_foto.jpg" alt="">
						<img class="product__hide_iteam" src="img/hidden_foto2.jpg" alt="">
						<img class="product__hide_iteam" src="img/hidden_foto3.jpg" alt="">
						<img class="product__hide_iteam" src="img/hidden_foto4.jpg" alt="">
						<img class="product__hide_iteam" src="img/hidden_foto5.jpg" alt="">
						<img class="product__hide_icon" src="img/next.svg" alt="">
					</div>
					<div class="${priseKind}">
						${productPrize.textContent}
					</div>
					<div class="product__hide_box">
						<a href="#/">посмотреть</a>
						<img src="img/cart.svg" alt="">
						<a href="#/">КУПИТЬ</a>
					</div>
				</div>
			`;
			productIteam[index].innerHTML = perevCont;
		}
	};

	const mouseLeave = (index) =>{

		console.log(productIteam[index].querySelector('.lowprise'))
		console.log(productIteam[index].querySelector('.product__prise'))
		let div  = document.createElement("div");
		if(productIteam[index].querySelector('.lowprise__hide')){
			console.log('qwewe')
			div.className = "lowprise__number";
			productIteam[index].querySelector('.lowprise').classList.remove('hide')
		}else{
			console.log('fghf')
			div.className = "product__prise";
		}
		console.log(productIteam[index])
		div.textContent = productIteam[index].querySelector('.' + priseKind).textContent;

		productIteam[index].classList.remove("active__hover");
		productIteam[index].querySelector('.product__number').style.marginBottom = "38px";
		productIteam[index].querySelector('.product__text').style.textTransform = 'none';

		productIteam[index].querySelector('.product__hide').remove();
		productIteam[index].append(div);
	};

	for(let i = 0; i < productIteam.length; i++){
		productIteam[i].addEventListener('mouseenter',(e) => {
			mouseOn(i,e);
		});
		productIteam[i].addEventListener('mouseleave',() => {
			mouseLeave(i);
		});
	}

	for(let i = 0; i < tabs.length; i++){
		tabs[i].addEventListener('click', () => {
			if(i == 0){
				console.log('qwe')
				console.log($('.intro__slider_block').remove('hide_slider'))
				document.querySelector('.intro__slider_block').classList.remove('hide_slider');
				document.querySelector('.intro__slider_block2').classList.add('hide_slider');

  				$('.intro__slider_block').slick('slickPlay');
  				$('.intro__slider_block2').slick('slickPause');

			}else if( i == 1){
				console.log('asd')
				document.querySelector('.intro__slider_block').classList.add('hide_slider');
				document.querySelector('.intro__slider_block2').classList.remove('hide_slider');

				$('.intro__slider_block').slick('slickPause');
  				$('.intro__slider_block2').slick('slickPlay');
			}

		});
	}
	

  	$('.blog__slider').slick({
  		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		centerMode: true,
		contain: true,
		variableWidth: true,
		autoplay: true,
  		autoplaySpeed: 3000,
		pauseOnHover: true,
		prevArrow: $('.blog__left'),
		nextArrow: $('.blog__right')
  	});

	$('.intro__slider_block').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: true,
		prevArrow: $('.left__arrow'),
		nextArrow: $('.right__arrow'),
		speed: 600,
		pauseOnHover: true
  	});

  	$('.intro__slider_block2').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: true,
		prevArrow: $('.left__arrow'),
		nextArrow: $('.right__arrow'),
		speed: 600,
		pauseOnHover: true
  	});
  	$('.intro__slider_block2').slick('slickPause');


  	if(window.innerWidth <= 1800 || 
  		document.querySelector('.brabds__slide').clientWidth > document.querySelector('.brands__name').clientWidth){
  		console.log('asdas')
  		const runLine = (iteam) => {
	  		const runBlock = document.querySelector(iteam);
	  		let counter = 0;
	  		let interval;
  		console.log(runBlock.clientWidth)

	  		runBlock.addEventListener('mouseenter',() => {
	  			clearInterval(interval)
	  		});

	  		runBlock.addEventListener('mouseleave',() => {
	  			startInterval();
	  		});

	  		function startInterval(){
	  			interval = setInterval(function() {
	  				if(counter <= -runBlock.clientWidth){
	  					console.log('asd')

	  					counter *= -1; 

	  					let runRight = counter - document.querySelector('.brands__name').clientWidth;

	  					counter -= runRight;
	  				}

		  			runBlock.style.transform = 'translateX(' + counter + 'px)'
		  			counter -= 1;
		  		},5)
	  		}

	  		startInterval();
	  		
	  	};

	  	runLine('.brabds__slide')
  	}

});