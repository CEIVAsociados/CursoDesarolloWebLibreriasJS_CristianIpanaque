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

//Iniciar el juego
function iniciarJuego(){
	$('.btn-reinicio').click(function () {
		if($(this).text() == "Reiniciar"){
			location.reload(true);
		}
		$(this).text("Reiniciar");
		//agregarDulcesPantalla();
		$("#timer").iniciar({
			onComplete: function(){
				finJuego();
			}
		});
	});
}

function finJuego(){
	$('div.panel-tablero, div.time').effect('blind',1200);
	$('h1.main-titulo').addClass('title-over')
		.text('¡El juego terminó!');
	$('div.score, div.moves, div.panel-score').width('100%');
}
//Cargar dulces aleatoriamente
function cargarDulcesAleatorios() {
    return Math.floor(Math.random() * 4) + 1;
}

/*function dulcesenFilas(index) {
	var dulceFilas = cargarDulcesPantalla('rows', index);
	return dulceFilas;
}

function dulcesenColumnas(index) {
	var dulceColumnas = cargarDulcesPantalla('columns');
	return dulceColumnas[index];
}

function cargarDulcesPantalla(tipoArreglo, index){
	var column1 = $('.col-1').children();
	var column2 = $('.col-2').children();
	var column3 = $('.col-3').children();
	var column4 = $('.col-4').children();
	var column5 = $('.col-5').children();
	var column6 = $('.col-6').children();
	var column7 = $('.col-7').children();

	var dulcesenColumnas = $([column1, column2, column3, column4,
		column5, column6, column7]);

	if (typeof index === 'number') {
		var dulcesenFilas = $([column1.eq(index), column2.eq(index), column3.eq(index),
			column4.eq(index), column5.eq(index), column6.eq(index),
			column7.eq(index)]);
	} else {
		index = '';
	}

	if (tipoArreglo === 'columns') {
		return dulcesenColumnas;
	} else if (tipoArreglo === 'rows' && index !== '') {
		return dulcesenFilas;
	}
}*/

$(document).ready(function(){
  	cambiarColorTitulo(".main-titulo");
  	iniciarJuego();
});