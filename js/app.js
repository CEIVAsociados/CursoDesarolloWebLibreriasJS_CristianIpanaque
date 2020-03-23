var mov = 0;
var puntos = 0;

//1. Cambiar el color del Titulo cada cierto tiempo
function cambiarColorTitulo(selector){
	 $(selector).animate(
	 {
	 	opacity: "1.0",
	 }, 400, function(){
	 	$(this).css('color', '#FFFF');
	 }).animate({
	 	opacity:"1.0"
	 },800, function(){
	 	$(this).css('color', '#FFFF00');
	 }).animate({
	 	opacity:"1.0"
	 },600, function(){
	 	$(this).css('color', '#FFFF');
	 }).animate({
	 	opacity:"1.0"
	 },400, function(){
	 	$(this).css('color', '#FFFF00');
	 	cambiarColorTitulo(".main-titulo")
	 }).delay(1000);
}

//2. Iniciar el juego y cargar los dulces a la pantalla aleatoriamente.
//Inicia el temporisador con cuenta regresiva de dos minutos.
//Carga el juego en la pantalla.
function iniciarJuego(){
	$('.btn-reinicio').click(function () {
		if($(this).text() == "Reiniciar"){
			location.reload(true);
		}
		$(this).text("Reiniciar");//6. Click en el botón y cambia su valor a Reiniciar
		$("#timer").iniciar({
			onComplete: function(){
				finJuego();
			}
		});
		cargarDulcesPantalla();
	});
}

//Genera el numero de dulces aleatoriamente para cargarlos posteriormente. 
function cargarDulcesAleatorios() {
    return Math.floor(Math.random() * 4) + 1;
}
//Cargar los dulces en pantalla
function cargarDulcesPantalla() {
	var col = $("[class^='col-']");
	var cant_cols = col.length;
	col.each(function () {
		var dulces = $(this).children().length;
		var total_filas = cant_cols - dulces;
		for (var i = 0; i < total_filas; i++) {
			var num_dulces = cargarDulcesAleatorios();
			if (i == 0 && dulces == 0) {
				$("<img src='image/" + num_dulces + ".png' class='elemento'></img>").appendTo(this);
			} else {
				//Si la columna ya tiene dulces, realiza la seleccion del primer dulce en columa y 
				//procede a llenar nuevamente con dulces nuevos.
				$(this).find("img:eq(0)").before("<img src='image/" + num_dulces + ".png' class='elemento'></img>");
			}
		}
	});
	validar();
}
//3. Se crea las siguientes funciones para capturar las filas y columnas para comparar y luego eliminar dulces
function dulcesenFilas(index) {
	var dulceFilas = cargarDulcesArray("filas", index);
	return dulceFilas;
}

function dulcesenColumnas(index) {
	var dulceColumnas = cargarDulcesArray("columnas");
	return dulceColumnas[index];
}

function cargarDulcesArray(tipoArreglo, index){
	var columna1 = $(".col-1").children();
	var columna2 = $(".col-2").children();
	var columna3 = $(".col-3").children();
	var columna4 = $(".col-4").children();
	var columna5 = $(".col-5").children();
	var columna6 = $(".col-6").children();
	var columna7 = $(".col-7").children();

	var dulcesenColumnas = $([columna1, columna2, columna3, columna4,
		columna5, columna6, columna7]);

	if (typeof index === "number") {
		var dulcesenFilas = $([columna1.eq(index), columna2.eq(index), columna3.eq(index),
			columna4.eq(index), columna5.eq(index), columna6.eq(index),
			columna7.eq(index)]);
	} else {
		index = "";
	}

	if (tipoArreglo === "columnas") {
		return dulcesenColumnas;
	} else if (tipoArreglo === "filas" && index !== "") {
		return dulcesenFilas;
	}
}
//Se valida las columnas y filas para eliminar dulces.
function validarColumnas() {
	for (var k = 0; k < 7; k++) {
		var contador = 0;
		var posicionDulce = [];
		var nuevaPosicionDulce = [];
		var columnaDulce = dulcesenColumnas(k);
		var compararValor = columnaDulce.eq(0);
		var eliminar = false;
		for (var i = 1; i < columnaDulce.length; i++) {
			var src = compararValor.attr('src');
			var srcDulce = columnaDulce.eq(i).attr('src');

			if (src != srcDulce) {
				if (posicionDulce.length >= 3) {
					eliminar = true;
				} else {
					posicionDulce = [];
				}
				contador = 0;
			} else {
				if (contador == 0) {
					if (!eliminar) {
						posicionDulce.push(i - 1);
					} else {
						nuevaPosicionDulce.push(i - 1);
					}
				}
				if (!eliminar) {
					posicionDulce.push(i);
				} else {
					nuevaPosicionDulce.push(i);
				}
				contador += 1;
			}
			compararValor = columnaDulce.eq(i);
		}
		if (nuevaPosicionDulce.length > 2) {
			posicionDulce = $.merge(posicionDulce, nuevaPosicionDulce);
		}
		if (posicionDulce.length <= 2) {
			posicionDulce = [];
		}
		numero_dulces = posicionDulce.length;
		if (numero_dulces >= 3) {
			for (var i = 0; i < posicionDulce.length; i++) {
				columnaDulce.eq(posicionDulce[i]).addClass('eliminar');
			}
			puntuacion(numero_dulces);
		}
	}
}

function validarFilas() {
	for (var k = 0; k < 7; k++) {
		var contador = 0;
		var posicionDulce = [];
		var nuevaPosicionDulce = [];
		var filaDulce = dulcesenFilas(k);
		var compararValor = filaDulce[0];
		var eliminar = false;
		for (var i = 1; i < filaDulce.length; i++) {
			var src = compararValor.attr('src');
			var srcDulce = filaDulce[i].attr('src');

			if (src != srcDulce) {
				if (posicionDulce.length >= 3) {
					eliminar = true;
				} else {
					posicionDulce = [];
				}
				contador = 0;
			} else {
				if (contador == 0) {
					if (!eliminar) {
						posicionDulce.push(i - 1);
					} else {
						nuevaPosicionDulce.push(i - 1);
					}
				}
				if (!eliminar) {
					posicionDulce.push(i);
				} else {
					nuevaPosicionDulce.push(i);
				}
				contador += 1;
			}
			compararValor = filaDulce[i];
		}
		if (nuevaPosicionDulce.length > 2) {
			posicionDulce = $.merge(posicionDulce, nuevaPosicionDulce);
		}
		if (posicionDulce.length <= 2) {
			posicionDulce = [];
		}
		numero_dulces = posicionDulce.length;
		if (numero_dulces >= 3) {
			for (var i = 0; i < posicionDulce.length; i++) {
				filaDulce[posicionDulce[i]].addClass('eliminar');
			}
			puntuacion(numero_dulces);
		}
	}
}

// Elimina dulces si hay coincidencia en la pantalla
function validar() {
	validarColumnas();
	validarFilas();
	if ($("img.eliminar").length !== 0) {
		efectoEliminarDulces();
	}
}

//4. Cuando termina el temporizador la pantalla cambia. Se esconde el tablero y se muestra la puntuacion 
//y movimientos al 100%
function finJuego(){
	$('div.panel-tablero, div.time').effect('blind',1200);
	$('h1.main-titulo').addClass('title-over')
		.text('¡El juego terminó!');
	$('div.score, div.moves, div.panel-score').width('100%');
}

$(document).ready(function(){
  	cambiarColorTitulo(".main-titulo");
  	iniciarJuego();
});