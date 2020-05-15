const player = document.querySelector('.player'),
    emeny = document.querySelector('.comp'),
    buttom = document.querySelectorAll('.buttom__iteam'),
    start = document.querySelector('.start'),
    win = document.querySelector('.win span'),
    lose = document.querySelector('.lose span'),
    draw = document.querySelector('.draw span');
let zero = 0;
let zero2 = 0;
let zero3 = 0;
let index;
let randomNumber;
let randomArr = [];
let result;
    
const src = {
    rock : 'rok.png',
    cut : 'cut.png',
    paper : 'paper.png'
}
const check = (elem1, elem2) =>{
    if (elem1 == 0) {
        elem2.style.backgroundImage = 'url(' + src.rock + ')';
    } else if (elem1 == 1) {
        elem2.style.backgroundImage = 'url(' + src.cut + ')';
    } else {
        elem2.style.backgroundImage = 'url(' + src.paper + ')';
    }
}

buttom.forEach( (iteam,i) => {
    iteam.addEventListener('click',(e)=>{
        buttom.forEach((iteam) => {
            iteam.classList.remove('active');
        });
        iteam.classList.add('active');
        index = i;

        check(index, player);
    });
});
const random = () =>{
    randomNumber = Math.round(Math.random() * (2 - 0)) + 0;

    randomArr.push(randomNumber);
    console.log(randomNumber);

    let arrLast = randomArr.length - 1;
    let arrPenult = randomArr.length - 2;

    if (randomArr[arrLast] == randomArr[arrPenult]) {
        random();
        console.log(randomNumber);

    }
}
const randomCheck = () => {
    random();

    check(randomNumber, emeny);
      
    if (index === randomNumber){
        zero++;
        draw.textContent = zero;
    }
    if (player.style.backgroundImage == 'url("cut.png")' && emeny.style.backgroundImage == 'url("paper.png")' 
    || player.style.backgroundImage == 'url("rok.png")' && emeny.style.backgroundImage == 'url("cut.png")' ||
    player.style.backgroundImage == 'url("paper.png")' && emeny.style.backgroundImage == 'url("rok.png")') {
        zero2++;
        win.textContent = zero2;
    }
    if (player.style.backgroundImage == 'url("cut.png")' && emeny.style.backgroundImage == 'url("rok.png")' ||
    player.style.backgroundImage == 'url("rok.png")' && emeny.style.backgroundImage == 'url("paper.png")' ||
    player.style.backgroundImage == 'url("paper.png")' && emeny.style.backgroundImage == 'url("cut.png")') {
        zero3++;
        lose.textContent = zero3;
    }
}

start.addEventListener('click', randomCheck);