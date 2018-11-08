let men = document.getElementsByClassName('btn'),
    man = document.getElementsByClassName('menu');


men[0].addEventListener('click', function(){

	if(!(this.classList.contains('active'))){
		this.classList.add('active');
	    man[0].style.left = 0;
	} else {
		this.classList.remove('active');
		man[0].style.left = -35 + '%';
}
})
	
	
