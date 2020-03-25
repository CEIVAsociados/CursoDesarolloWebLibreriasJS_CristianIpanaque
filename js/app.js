var cant_mov = 0;
var numero_mov = 0;
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
	eventosDulces();
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

//Se procede a dar puntuacion por cada dulce que sea eliminado.
function puntuacion(numero_dulces) {
	puntos = Number($('#score-text').text());
	switch (numero_dulces) {
		case 3:
			puntos += 1;
			break;
		case 4:
			puntos += 2;
			break;
		case 5:
			puntos += 4;
			break;
		case 6:
			puntos += 6;
			break;
		case 7:
			score += 10;
	}
	$('#score-text').text(puntos);
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

//5. Cuando se realiza un movimiento se cuenta y se muestra el mumero total de movimientos.
function cambiarDulces(event, arrastrarDulce) {
	var arrastrarDulce = $(arrastrarDulce.draggable);
	var srcMover = arrastrarDulce.attr('src');
	var eliminarDulce = $(this);
	var srcEliminar = eliminarDulce.attr('src');
	arrastrarDulce.attr('src', srcEliminar);
	eliminarDulce.attr('src', srcMover);

	setTimeout(function () {
		cargarDulcesPantalla();
		if ($('img.eliminar').length === 0) {
			arrastrarDulce.attr('src', srcMover);
			eliminarDulce.attr('src', srcEliminar);
		} else {
			actualizar();
		}
	}, 1000);

}

//Se cuenta la cantidad de movimientos y se muestea.
function actualizar() {
	numero_mov = Number($('#movimientos-text').text());
	cant_mov = numero_mov += 1;
	$('#movimientos-text').text(cant_mov);
}

//7. El usuario interactua mediante los metodos drop y drag
function eventosDulces() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 1000,
		grid: [100, 100],
		zIndex: 10,
		drag: movimientoDulce
	});
	$('img').droppable({
		drop: cambiarDulces
	});
	activarEventos();
}

function desactivarEventos() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function activarEventos() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

function movimientoDulce(event, arrastrar) {
	arrastrar.position.top = Math.min(100, arrastrar.position.top);
	arrastrar.position.bottom = Math.min(100, arrastrar.position.bottom);
	arrastrar.position.left = Math.min(100, arrastrar.position.left);
	arrastrar.position.right = Math.min(100, arrastrar.position.right);
}

//Efecto cuando se eliminan los dulces.
function efectoEliminarDulces() {
	desactivarEventos();//desactiva los efectos de drop y draggable al momento de eliminar dulces.
	$('img.eliminar').effect('pulsate', 800);
	$('img.eliminar').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				eliminarDulces()
			},
			queue: true
		});
}

//SE eliminan los dulces y vuelve a cargar con dulces nuevos.
function eliminarDulces() {
	$('img.eliminar').remove();
	cargarDulcesPantalla();
}

$(document).ready(function(){
  	cambiarColorTitulo(".main-titulo");
  	iniciarJuego();
});