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
		parar();
		mov = 0;
		time = 2;
		puntos = 0;
		$("#movimientos-text").text("0");
		$("#score-text").text("0");
		$("#timer").text("02:00")
		$(this).text("Reiniciar");
		//agregarDulcesPantalla();
		iniciar();
	});
}
//Cargar dulces aleatoriamente
function cargarDulcesAleatorios() {
    return Math.floor(Math.random() * 4) + 1;
}


$(document).ready(function(){
  	cambiarColorTitulo(".main-titulo");
  	iniciarJuego();
});