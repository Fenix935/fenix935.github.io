	var btn = document.querySelector("#btn");
	var btn2 = document.querySelector("#btn2");
	var row = document.querySelector(".nav__row");
	var box = document.querySelector(".bottom__box");
	var point = document.querySelector(".nav__bottom i");
	var content = document.querySelector(".nav__row");
	var scrolled;
	var timer;
	var up_btn = document.querySelector("#up_btn");
	up_btn.onclick=function(){
		scrolled = window.pageYOffset;
		scrollToTop();
	}
	function scrollToTop(){
		if (scrolled > 0) {
			window.scrollTo(0, scrolled);
			scrolled = scrolled - 300; //speed of scroll
			timer = setTimeout(scrollToTop, 50);
		}
		else{
			clearTimeout(timer);
			window.scrollTo(0,0);
		}
	}
	btn.onclick=function(){
		btn.classList.toggle("active");
		content.classList.toggle("active__cont");
	}
	btn2.onclick=function(){
		box.classList.toggle("active__btn");
		point.classList.toggle("rotate");
	}
	