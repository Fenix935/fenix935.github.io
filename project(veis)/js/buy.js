window.addEventListener('DOMContentLoaded',function() {

	const selectInput = (iteam) => {
		const selectBox = document.querySelectorAll(iteam);

		for(let i = 0; i < selectBox.length; i++){
			selectBox[i].addEventListener('click',(event) =>{
				showHide(event);
			});
		};

		function showHide(event){
			if(event.target.classList[0] === 'select__box'){
				let child = event.target.lastElementChild.children;

				for(let i = 0; i < selectBox.length; i++){
					removeChoose(selectBox[i].lastElementChild);
				}

				for(let i = 0; i < child.length; i++){
					child[i].addEventListener('click',(e) => {
						changeText(e);
					});
				}

				event.target.lastElementChild.style.display = 'block';
				setTimeout(function(){
					event.target.lastElementChild.classList.add('show');
				},50);
				document.body.addEventListener('click',(e) => {
					if(e.target.classList[0] !== 'select__box'){
						removeChoose(event.target.lastElementChild);
					}

				});
			}
			

		}

		function changeText(e) {
			if(e.target.className === ''){
				let parent = e.target.parentElement;
				let parentElement = parent.parentElement;
				parentElement.querySelector('span').textContent = e.target.textContent;
			}
		}

		 function removeChoose(iteam) {
		 	iteam.style.display = 'none';
			iteam.classList.remove('show');
		}
	}

	const changeColorInput = (iteam) => {
		const input = document.querySelectorAll(iteam);
		for(let i = 0; i < input.length; i++){
			input[i].addEventListener('focus',() =>{
				input[i].style.backgroundColor = '#f8f8f8';
				input[i].style.borderColor  = '#ECECEC';
			});
			input[i].addEventListener('blur',() =>{
				input[i].style.backgroundColor = '#fff';
				input[i].style.borderColor  = '#999999';
			});
		}
	};

	const countPrise = (iteam,iteam2) => {
		const num = document.querySelectorAll(iteam),
		 	  sum = document.querySelector(iteam2)
		let result = 0;
		if(num.length > 1){
			for(let i = 0; i < num.length; i++){
				result +=  (+num[i].textContent)
			}
		}else if(num.length == 1){
			result = +num[0].textContent
		}

		sum.textContent = result;
	};

	const deletProduct = (iteam) => {
		const product = document.querySelectorAll(iteam);

		for(let i = 0; i < product.length; i++){
			product[i].addEventListener('click', (e) => {
				delet(e,i);
			});

			function delet(e,i) {
				if(e.target.className === "selected__close"){
					if(i == 0){
						i += 1;
						product[i].classList.add('buy2');
					}else{
						i -= 1;
						product[i].classList.add('buy2');
					}
					e.target.parentElement.remove();
					countPrise('.selected__prize span','.buy__prise span');
					countPrise('.selected__prize span','.media__bottom_second span');
				}
			}
		} 
	};	

	const footShow = (iteam,iteam2) =>{
		const clickBlock = document.querySelector(iteam),
			  showBlock = document.querySelectorAll(iteam2);

			clickBlock.addEventListener('click',openFoot);


		function openFoot () {

			if(clickBlock.classList[1] === 'link__active'){
				clickBlock.classList.remove('link__active');
				for(let i = 0; i < showBlock.length; i++){
					showBlock[i].style.display = 'none';
					showBlock[i].style.height = '0';
					clickBlock.querySelector('img').style.transform = 'rotate(-180deg)';
				}
			}else{
				clickBlock.classList.add('link__active');
				for(let i = 0; i < showBlock.length; i++){
					showBlock[i].style.display = 'block';
					clickBlock.querySelector('img').style.transform = 'rotate(0)';

					setTimeout(function(){
						showBlock[i].style.height = 'auto';
					},10)
				}

			}
		}

	};

	let element = document.querySelectorAll('.phone');

	let maskOptions = {
	    mask: '+38 (000) 000-00-00',
	    lazy: false
	} 
	for(let i = 0; i < element.length; i++){
		let mask = new IMask(element[i], maskOptions);
	}

	footShow('.media__top_link','.media__form_hide')

	deletProduct('.buy__selected')
	countPrise('.selected__prize span','.buy__prise span');
	countPrise('.selected__prize span','.media__bottom_second span');
	changeColorInput('.input__text');
	selectInput('.select__box')
});