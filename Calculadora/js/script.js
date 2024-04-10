// variables globales
var primerNumero = 0;
var operation;

// funcion para asignarle el numero a la pantalla
function setNumber(number){
    console.log(number);
    var item =  document.getElementById("pantalla");
    var oldValue = item.value;
    if(oldValue == 0){
        item.value = number;
    }else{
        item.value = oldValue+''+number;
    }
}

// funcion para limpiar la pantalla
function clearScreen(){
    var item =  document.getElementById("pantalla");
    item.value = 0;
}
// funcion para sumar, permite guardar el primer numero y saber que la operacion
//sera la suma
function sum(){
    var item =  document.getElementById("pantalla");
    operation = 'sum';
    primerNumero =  item.value;
    clearScreen();
}
// funcion para restar, permite guardar el primer numero y saber que la operacion
//sera la resta
function sub(){
    var item =  document.getElementById("pantalla");
    operation = 'sub';
    primerNumero =  item.value;
    clearScreen();
}
// funcion para multiplicar, permite guardar el primer numero y saber que la operacion
//sera la multiplicacion
function mult(){
    var item =  document.getElementById("pantalla");
    operation = 'mult';
    primerNumero =  item.value;
    clearScreen();
}
// funcion para dividir, permite guardar el primer numero y saber que la operacion
//sera la division
function div(){
    var item =  document.getElementById("pantalla");
    operation = 'div';
    primerNumero =  item.value;
    clearScreen();
}
// funcion para obtener el mayor, permite guardar el primer numero y saber que la operacion
function max(){
    var item =  document.getElementById("pantalla");
    operation = 'max';
    primerNumero =  item.value;
    clearScreen();
}
// funcion para obtener el mayor, permite guardar el primer numero y saber que la operacion
function min(){
    var item =  document.getElementById("pantalla");
    operation = 'min';
    primerNumero =  item.value;
    clearScreen();
}
//esta funcion permite obtener el resultado, con el primer numero obtenido y segun la ultima operacion guardada
function equals(){
    var item =  document.getElementById("pantalla");
    var segundoNumero = item.value;
    var result;
    if(operation == 'sum'){
        result = Number(primerNumero)+Number(segundoNumero);
    }
    if(operation == 'sub'){
        result = Number(primerNumero)-Number(segundoNumero);
    }
    if(operation == 'mult'){
        result = Number(primerNumero)*Number(segundoNumero);
    }
    if(operation == 'div'){
        result = Number(primerNumero)/Number(segundoNumero);
    }
    if(operation == 'max'){
        if(Number(primerNumero)>Number(segundoNumero)){
            result = primerNumero;
        }else{
            result = segundoNumero;
        }
    }
    if(operation == 'min'){
        if(Number(primerNumero)<Number(segundoNumero)){
            result = primerNumero;
        }else{
            result = segundoNumero;
        }
    }
    item.value = result;
}
