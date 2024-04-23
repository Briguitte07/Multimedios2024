///Propiedades 
let datosTabla = document.querySelector('#datos');//Cuando es queryselector requiere el #
//URL de la API
let url = "https://paginas-web-cr.com/Api/apis/";
let listar = "ListaUsuarios.php";
let insertar = "InsertarUsuarios.php";

//Spiner de Carga
let spinner = `
<button class="btn btn-success" type="button" disabled>
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span role="status">Loading...</span>
</button>`;
//Toma el nombre de la pagina en una variable
let nombrePagina = document.title;
//Variable con el nombre de las paginas 
let nombreModuloListar = "Lista de Usuarios";
let nombreModuloCrear = "Crear Usuarios";
//--------------------------------------------------------------------------------//
//Eventos

//El siguiente es un evento que evita que la pagina se recargue
if(nombrePagina==nombreModuloCrear){
    formulario.addEventListener('submit', 
    function(evento){
        evento.preventDefault();

        let datos = new FormData(formulario); //Reset

        let datosEnviar = {
            name : datos.get('name'),  //obtener los datos que se van a enviar
            password: datos.get('password'),
            email: datos.get('email')
        }

        //Insertar la url que contiene la Api + POST
        fetch(url + insertar,
            {
                method :'POST',
                body: JSON.stringify(datosEnviar)
            }
        )
        .then(respuesta=>respuesta.json())
        .then( (datosrepuesta) => {
            mensajeInsertar(datosrepuesta) //metodo de verificación de alerta
        })
        .catch(console.log)
    })
}
//--------------------------------------------------------------------------------//
//Metodos
//Funcion que verifica la alerta
function mensajeInsertar(datos){
    if(datos.code ==200){         ///Si esta bien, el ingreso es exitoso
        mensajesSistema.innerHTML = `<div
        class="alert alert-success alert-dismissible fade show"
        role="alert"
    >
        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
        ></button>
        <strong>Ingreso exitoso</strong>
    </div>`;
    }
    else{                                     //Si no manda la alerta de correo duplicado
        mensajesSistema.innerHTML = `<div   
                class="alert alert-warning alert-dismissible fade show"
                role="alert"
            >
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
                <strong>Correo duplicado</strong>
            </div>`;
    }
}
//Funcion para cargar los datos 
function cargarDatos(){
    loadspinner();   //Carga el spinner

    //url + lista
    fetch( url + listar)
    .then(respuesta=>respuesta.json())
    .then( (datosrepuesta) => {
        mostrarDatos(datosrepuesta)
    })
    .catch(console.log)
}

//Funcion para mostrar los datos
function mostrarDatos(datos){
    if(datos==200){
        for (const iterator of datos.data){
            datosTabla.innerHTML += `
            <tr class="">
                <td>
                <a
                    name=""
                    id=""
                    class="btn btn-success"
                    onclick="editar('${encodeURIComponent(JSON.stringify(iterator))}')"
                    role="button"
                    ><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg></a
                >                    
                
                <a
                    name=""
                    id=""
                    class="btn btn-danger"                        
                    role="button"
                    ><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eraser"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" /></svg></a
                >
                </td>
                <td scope="row">${iterator.id}</td>
                <td>${iterator.name}</td>
                <td>${iterator.email}</td>
                <td>${iterator.password}</td>                    
            </tr>
            `;
        }
    }else{
        alert("Algo salio mal");
    }
    document.getElementById("spinnerload").innerHTML = "";
}

//Funcion para cargar el spinner
function loadspinner(){
    document.getElementById("spinnerload").innerHTML = spinner;
}

//Funcion para editar el usuario
function editar(objeto) {
    console.log(objeto);
    objeto = JSON.parse(decodeURIComponent(objeto));
    console.log(objeto);
}
//--------------------------------------------------------------------------------//
//Ejecutar funciones
if (nombrePagina == nombreModuloListar ){
    cargarDatos();
}

//--------------------------------------------------------------------------------//