var initialTimer = 120000;
var intervalo = 1000;
var segundos = 60;
var minutos = 2;
var control;
var onComplete;

$.fn.iniciar = function(options){
	onComplete = options.onComplete;
	control = setInterval(countDown, intervalo);
}

function parar(){
	clearInterval(control);
}

function countDown() {

	if(minutos == minutos && segundos == 60){
		minutos--;
		segundos--;
		timer.innerHTML = "0"+minutos+":"+segundos;
	}else if(segundos == 59 || segundos > 10){
		segundos--;
		timer.innerHTML = "0"+minutos+":"+segundos;
	}else if(segundos <= 10){
		segundos--;
		timer.innerHTML = "0"+minutos+":0"+segundos;
		if(segundos == 0){
			timer.innerHTML = "0"+minutos+":0"+segundos;
			if(minutos == 0 && segundos == 0){
				end = true;
				parar();
				onComplete();
			}
			segundos = 60;
		}
	}

}




