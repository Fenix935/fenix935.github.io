window.addEventListener('DOMContentLoaded',function(){

	const inner = document.querySelectorAll('.casino__inner'),
	      start = document.querySelector('.pay__start'),
	      bet = document.querySelector('.pay__money'),
	      fastBet = document.querySelectorAll('.fastBet__iteam'),
	      payBlock = document.querySelector('.casino__pay');
	let index = 9; 
	let obj = {};
	let betValue;
	let winSum;
	let template = `
		<label for="money" class="pay__text">Ваша ставка</label>
		<input type="number" id="money" class="pay__money" placeholder="Минимал 100&#8381;">
		<div class="pay__start">Start</div>`;
	// localStorage.clear();
	let bill = +localStorage.getItem('bill');
	if(bill == 0){
		localStorage.setItem('bill', document.querySelector('#bill').textContent);
	}else{
		document.querySelector('#bill').textContent = bill;
	}
	
	
	const createNum = () => {
		for(let i = 0; i <= 9; i++){
			let num = Math.round(Math.random() * 3 - 0) + 0;
			obj[i] = num;
		}
	};

	const changeBill = (sum = false) => {
		if(sum == false){
			document.querySelector('#bill').textContent = bill - betValue;
			localStorage.setItem('bill', bill - betValue);
			bill = +localStorage.getItem('bill');
		}else if(sum == true){
			document.querySelector('#bill').textContent = bill + winSum;
			localStorage.setItem('bill', bill + winSum);
			bill = +localStorage.getItem('bill');
		}
	};

	const startGame = () => {
		let	bet = document.querySelector('.pay__money');
		if(betValue === '' || !betValue){
			alert('Введено неверное значение ставки');
		}else if(betValue > bill){
			alert('Введена сумма больше вашего баланса');
		}else if(betValue < 100){
			alert('Введенная сумма меньше минимальной');
		}else if(bill - (betValue) < 0){
			alert('Не достаточно средст на балансе :((');
		}else{
			changeBill()
			payBlock.style.justifyContent = 'center';
			payBlock.innerHTML = `<div class="stop">Stop</div>`;
			inner[index].addEventListener('click',checkClick);
			inner[index].children[4].style.color = '#44BD32';
		}
	};

	const win = () => {
		let procent = +inner[index].children[4].textContent.replace(/x/g,'');
		winSum = betValue * procent;
		let stop = document.querySelector('.stop');
		
		alert('Вы выиграли ' + winSum + '\nПоздравляем :))');

		changeBill(true);
		document.querySelector('.stop').removeEventListener('click',stopGame);
		stop.style.backgroundColor = '#44BD32';
		stop.textContent = 'Restart';
		stop.addEventListener('click',() => {
			payBlock.style.justifyContent = 'space-between';
			payBlock.innerHTML = template;

			restart();
		});
	};

	const stopGame = () => {
		let procent = +inner[index + 1].children[4].textContent.replace(/x/g,'');
		winSum = betValue * procent;
		let confir = confirm("Вы уверенны что хотите закончить :(( \nВы получите " + winSum);

		if(confir == true){
			payBlock.style.justifyContent = 'space-between';
			payBlock.innerHTML = template;

			changeBill(true);
			restart();
			index = 9;


		}
	};

	const restart = () => {
		let	bet = document.querySelector('.pay__money');
		let count = 0;
		index = 9;
		inner.forEach(iteam => {
			let child = iteam.children;
			inner[index].children[4].style.color = '#fff';
			
			for(let i = 0; i < child.length; i++){
				if(child[i].classList.length == 2){
					child[i].textContent = '?';
					child[i].classList.remove('right');
					child[i].classList.remove('wrong');
					child[i].removeAttribute('id');
				}else if(i == 4){
					child[i].style.color = '#fff';
				}

			}
			count++
		});

		inner.forEach(iteam => {
			iteam.removeEventListener('click',checkClick);
		});

		createNum();
		// console.log(obj);
		document.querySelector('.pay__start').addEventListener('click',startGame);
		bet.addEventListener('blur',() => {
			betValue = +bet.value;
		});
		index = 9;
		document.querySelector('.fastBet').style.display = 'block';
	};


	const lose = () => {
		let count = 0;
		let stop = document.querySelector('.stop');
		alert("Вы проиграли");

		document.querySelector('.stop').removeEventListener('click',stopGame);
		stop.style.backgroundColor = '#44BD32';
		stop.textContent = 'Restart';
		stop.addEventListener('click',() => {
			payBlock.style.justifyContent = 'space-between';
			payBlock.innerHTML = template;

			restart();
		});

		inner.forEach(iteam => {
			let child = iteam.children;
			
			for(let i = 0; i < child.length; i++){
				
				if(i == obj[count] &&
				 child[i].classList.value === 'casino__iteam'){
					child[i].classList.add('right');
					child[i].textContent = '';
				}else if(child[i].classList.value === 'casino__iteam'){
						child[i].classList.add('wrong');
						child[i].textContent = '';
				}
			}
			count++
		});
	};

	const checkClick = (e) => {
		let checkedIndex;
		if(e.target.classList.value === "casino__iteam"){
			let click = inner[index].children;
			e.target.setAttribute('id', 'click');
			for(let i = 0; i < click.length; i++){
				if(click[i].getAttribute('id') === 'click'){
					checkedIndex = i;
				}
			}
			if(obj[index] == checkedIndex){
				click[checkedIndex].classList.add('right');
				click[checkedIndex].textContent = '';

				for(let i = 0; i < click.length; i++){
					if(click[i].classList.value === "casino__iteam"){
						click[i].textContent = '';
						click[i].classList.add('wrong');
					}
				}

				inner.forEach(iteam => {
					inner[index].children[4].style.color = '#fff';
				});

				if(index == 0){
					win();
				}
				index--;
				if(index < 0){
					return;
				}
				inner[index].children[4].style.color = '#44BD32';
				inner[index].addEventListener('click',checkClick);
				document.querySelector('.stop').addEventListener('click',stopGame);
			}else{
				click[obj[index]].classList.add('right');
				click[obj[index]].textContent = '';

				for(let i = 0; i < click.length; i++){
					if(click[i].classList.value === "casino__iteam"){
						click[i].textContent = '';
						click[i].classList.add('wrong');
					}
				}
				lose();
			}
		}
	};

	start.addEventListener('click',startGame);

	bet.addEventListener('blur',() => {
		betValue = +bet.value;
	});
	fastBet.forEach(iteam => {
		iteam.addEventListener('click',() => {
			betValue = +iteam.textContent;
			startGame();
			document.querySelector('.fastBet').style.display = 'none';
		});
	});

	createNum();
	// console.log(obj)

});