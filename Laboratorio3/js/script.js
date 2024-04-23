//variables globales
var primerNumero = 0; //dividendo
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
    document.getElementById("pantalla").value = 0;
}


// funcion para dividir, permite guardar el primer numero y saber que la operacion
//sera la division
function div(){
    primerNumero =  parseInt(document.getElementById("pantalla").value);
    operation = 'div';
    clearScreen();
}

//esta funcion permite obtener el resultado, con el primer numero obtenido y segun la ultima operacion guardada
function equals(){
    var item; 
    item = document.getElementById("pantalla");
    console.log(item.value);//al ser string en la consola se ve de un color diferente al numerico
    console.log(parseInt(item.value));//al ser numerico en la consola se ve de un color diferente al string
    var segundoNumero = parseInt(item.value); //divisor
    
    console.log('entra a dividir');
    if(segundoNumero==0){
        item.value =  "Error: No se puede dividir por cero";
    }
    if(segundoNumero==1){
        item.value = primerNumero;
    }
    if(segundoNumero!=1 && segundoNumero!=0){
        var result = primerNumero;
        var cociente = 0;
        // Mientras el resultado sea mayor o igual que el divisor
        while(result>=segundoNumero){
        // Restar el divisor del resultado
        result-= segundoNumero;
        // Incrementar el cociente
        cociente++;
        }
        item.value = cociente;
    }  
       
}
