window.onload = function(){
    const lineBtn = document.querySelectorAll('.count__circle'),
        package = document.querySelectorAll('.count2__box'),
        size = document.querySelector('.result__text span'),
        result = document.querySelector('#res'),
        tagButton = document.querySelectorAll('.portfolio__box'),
        content = document.querySelectorAll('.portfolio__block');
    let timer;
    let help = document.querySelector('.help');
    let number = 1000;
    let packageVal = 100;
    let oneMetr = 4850;
    let index = 0;
    let scrollWidth;
    
    const tags = () => {
        tagButton.forEach((iteam,i)=>{
            
            iteam.addEventListener("click",(e)=>{
                index = i;
                tagButton.forEach((iteam)=>{
                    iteam.classList.remove('portfolio__active');
                    iteam.classList.remove('portfolio__active-left');
                    iteam.classList.remove('portfolio__active-right');
                });
                if (e.target.id == 'left') {
                    e.toElement.classList.add('portfolio__active-left');
                } else if (e.target.id == 'right') {
                    e.toElement.classList.add('portfolio__active-right');
                }else{
                    e.toElement.classList.add('portfolio__active');
                }
                content.forEach(iteam => {
                    iteam.classList.add('none')
                });
                content[index].classList.remove('none');
            });
        });
    }

    const change = (elem1,elem2,first) => {
        elem1.forEach((iteam)=>{
        iteam.addEventListener("click",(e)=>{
            elem1.forEach((iteam)=>{
                iteam.classList.remove(elem2);
            });
            e.toElement.classList.add(elem2);
            if(first == true){
                number = iteam.dataset.number;
            }else{
                packageVal = iteam.dataset.package;
            }
            size.textContent = number;
            let resultText = (Math.round((+number) / (+packageVal))) * oneMetr;
            result.textContent = resultText;
        });
    });
    }
    const showHelp = () => {
        package.forEach((iteam,i) =>{
            iteam.addEventListener('mouseover', (e) => {
                if(e.target.id == '1'){
                    help.className = "hide-left";
                    timer = setTimeout(function () {
                        help.classList.add("show");
                        help.textContent = 'План расстановки мебели 3D визуализация развертки по стенам, план электросетей)';
                    }, 1500);
                } else if (e.target.id == '3'){
                    help.className = "hide-right";
                    timer = setTimeout(function () {
                        help.classList.add("show");
                        help.textContent = 'План расстановки мебели 3D визуализация. Все рабочие чертежи ';
                        }, 1500);
                } else {
                    help.className = "help";
                    timer = setTimeout(function() {
                        help.classList.add("show");
                        help.textContent = 'План расстановки мебели 3D визуализация. Все рабочие чертежи (план полов, план потолка, развертки по стенам, план электросетей)';
                    },1500);
                }
            });
            iteam.addEventListener('mouseout', () => {
                clearTimeout(timer);
                help.classList.remove("show");         
            });
        });
    }

    const checkWidth = () => {
        let div = document.createElement('div');
        document.body.append(div);
        div.style.width = '100px';
        div.style.height = '100px';
        div.style.overflowY = 'scroll';
        scrollWidth = 100 - div.clientWidth;
        div.remove();
    }

    const open = (modal, openIteam, closeIteam) =>{
            modal = document.querySelector(modal);
            openIteam = document.querySelector(openIteam);
            closeIteam = document.querySelector(closeIteam);

            modal.addEventListener("click",function(e) {
                e.preventDefault();
                openIteam.style.display = "block";
                document.body.style.marginRight =scrollWidth + 'px'; 
                document.body.style.overflow = "hidden"; 
            });

            closeIteam.addEventListener("click", function (e) {
                openIteam.style.display = "none";
                document.body.style.marginRight ='0'; 
                document.body.style.overflow = "auto";
            });
        }
   

    open('.servis__btn', '.modal','.close');
    open('.count__btn', '.modal','.close');
    change(lineBtn,'circle__active',true);
    change(package,'count2__active',false);
    tags();
    showHelp();
    checkWidth();
}