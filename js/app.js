var elementos = document.getElementsByTagName('img'); //Guarda en una matriz todos los elementos img, es decir, todas las teclas
for (var i = 0; i < elementos.length; i++) { // Ciclo for para recorrer  la matriz y agregar los listener a cada elemento
		elementos[i].addEventListener("mousedown", function(event) { //Agrega un listener a cada elemento para disminuir su escala al hacer mouseDown
			this.style.MozTransform = 'scale(0.8,0.8)';
			this.style.WebkitTransform = 'scale(0.8,0.8)';
			this.style.msTransform = 'scale(0.8,0.8)';
			this.style.transform = 'scale(0.8,0.8)';
		});
		elementos[i].addEventListener("mouseup", function(event) { //Agrega un listener a cada elemento para disminuir su escala al hacer mouseUp
			this.style.MozTransform = 'scale(1,1)';
			this.style.WebkitTransform = 'scale(1,1)';
			this.style.msTransform = 'scale(1,1)';
			this.style.transform = 'scale(1,1)';
		});
		elementos[i].addEventListener("click", processEvent, false); //Agrega un listener a cada alemento de la matriz para ir guardando cada elemento al que se le hace clic
}
var xValor = '0'; //Primero operando
var yValor = '0'; //Segundo operando
var operador = ''; //Signo de la operación matemática
var	resultado = '0' //Almacenar el resultado
var ultimaTecla = ''; //Guarda la última tecla en la que se hace clic

function processEvent(e){
	console.log(this.id); //Imprime el resultado en la consola. Solo para hacer verificadiones
	if (display.textContent.length < 8){ // Controlar que no se muestren mas de 8 caracteres
		if (this.id >= 0 && this.id <= 9){//Evalua si la tecla en la que se hace clic es un dígito
			if(display.textContent == '0'){
				display.textContent = this.id;
			}else{
				display.textContent = display.textContent + this.id;
			}
		}
		if (this.id == 'punto') {//Cuando se hace clic en el punto
			if (display.textContent.indexOf(".") == -1) { //Verifica si no hay un punto en el display
				display.textContent = display.textContent + "."
			}
			if (display.textContent == "0") {
				display.textContent = "0."
			}
		}
		if (this.id == 'sign') {//valida cuando se hace clic en +/-
			if(display.textContent != "0"){
				if (display.textContent.indexOf("-") == -1){
					display.textContent = "-" + display.textContent;
				}else{
					display.textContent = display.textContent.substring(1,display.textContent.length);
				}
			}
		}
		if (this.id == 'mas') {//valida cuando se hace clic en +
			operador = '+';
			xValor = display.textContent;
			display.textContent = '0';
		}
		if (this.id == 'menos') {//valida cuando se hace clic en -
			operador = '-';
			xValor = display.textContent;
			display.textContent = '0';
		}
		if (this.id == 'por') {//valida cuando se hace clic en *
			operador = '*';
			xValor = display.textContent;
			display.textContent = '0';
		}
		if (this.id == 'dividido') { //valida cuando se hace clic en /
			operador = '/';
			xValor = display.textContent;
			display.textContent = '0';
		}
		if (this.id == 'igual') { //valida cuando se hace clic en raiz
			if (resultado === '0' ) { //Es la primera operacion
				yValor = display.textContent;
			}
			else{
				xValor = resultado;
				if (ultimaTecla == "igual") {
					yValor = yValor;
				}else{
					yValor = display.textContent;
				}
			}
			switch(operador){
				case('+'):
					resultado = sumar(xValor, yValor);
					break;
				case('-'):
					resultado = restar(xValor, yValor);
					break;
				case('*'):
					resultado = multiplicar(xValor, yValor);
					break;
				case('/'):
					resultado = dividir(xValor, yValor);
					break;
			}
			console.log("Operación: " + xValor + " " + operador + 	" " + yValor + " = " + resultado);  // Mustra la operacion en la consola
            display.textContent = resultado.toString().substr(0,8);

		}
   } //Fin Controlar la longitud de 8 caracteres
   if (this.id == 'on') { // Valida si se hace click en ON y borra el contenido del display
	   display.textContent = '0';
	   xValor = '0';
       yValor = '0';
	   operando3 = '0';
	   operador = '';
	   resultado = 0;
	   ultimaTecla = '';
   }
   ultimaTecla = this.id;//Captura la ultima tecla en la que se hizo clic, para mas tarde averiguar si corresponde al signo de igual
}

function sumar(n1, n2){
	return(parseFloat(n1) + parseFloat(n2));
}
function restar(n1, n2){
	return(parseFloat(n1) - parseFloat(n2));
}
function multiplicar(n1, n2){
	return(parseFloat(n1) * parseFloat(n2));
}
function dividir(n1, n2){
	return(parseFloat(n1) / parseFloat(n2));
}

var Calculadora = {
	init: function(){

		this.eventoSumar();
		this.eventoRestar();
		this.eventoMultiplicar();
		this.eventoDividir();
	},
	eventoSumar: function(n1, n2){
		sumar(n1, n2);
	},
	eventoRestar: function(n1, n2){
		restar(n1, n2);
	},
	eventoMultiplicar: function(n1, n2){
		multiplicar(n1, n2);
	},
	eventoDividir: function(n1, n2){
		dividir(n1, n2);
	}
}
Calculadora.init();
