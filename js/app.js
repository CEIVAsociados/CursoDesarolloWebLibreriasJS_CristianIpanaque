//Cambiar el color del Titulo cada cierto tiempo
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

//Cargar dulces aleatoriamente
function cargarDulcesAleatorios() {
    return Math.floor(Math.random() * 4) + 1;
}

$(document).ready(function() {
  	cambiarColorTitulo(".main-titulo");
});