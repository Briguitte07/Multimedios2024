//Propiedades
let datosTabla = document.querySelector('#datos');//Cuando es queryselector requiere el #
let mensajesSistema =  document.querySelector('#mensajesSistema');
let formulario = document.getElementById('formulario');//Cuando es id, no requiere el #
let formularioEditar = document.getElementById('formularioEditar');


let nombrePagina = document.title;
let nombreModuloListar = "Estudiantes";
let nombreModuloCrear = "Agregar Estudiante";


let url = "https://paginas-web-cr.com/Api/apis/";
let listar = "ListaEstudiantes.php";
let insertar = "InsertarEstudiantes.php";
let actualizar = "ActualizarEstudiantes.php";
let eliminarEstudiante = "BorrarEstudiantes.php";


let spinner = `
<button class="btn btn-success" type="button" disabled>
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span role="status">Loading...</span>
</button>`;

//Eventos//-------------------------------------------------------------------------------------------------------------//
//Evento para Guardar datos del Formulario
if ( nombrePagina == nombreModuloCrear ){
    formulario.addEventListener('submit', 
    function(evento) {
        evento.preventDefault();//evita que la pagina se recargue
        
        let datos = new FormData(formulario);
        
        let datosEnviar = {
            cedula: datos.get('cedula'),
            correoelectronico: datos.get('email'),
            telefono: datos.get('tel'),
            telefonocelular: datos.get('cel'),
            fechanacimiento: datos.get('nacimiento'),
            sexo: datos.get('sexo'),
            direccion: datos.get('direccion'),
            nombre: datos.get('nombre'),
            apellidopaterno: datos.get('apellido1'),
            apellidomaterno: datos.get('apellido2'),
            nacionalidad: datos.get('nacionalidad'),
            idCarreras: datos.get('idcarrera'),
            usuario: datos.get('usuario')
        }

        //url + insertar esto es la url del servicio concatenada
        fetch( url + insertar,
            {
                method: 'POST',
                body: JSON.stringify(datosEnviar)
            } 
        )
        .then(respuesta=>respuesta.json())
        .then( (datosrepuesta) => {
            //console.log(datosrepuesta)
            mensajeInsertar(datosrepuesta)
        })
        .catch(console.log)

    })
}
//-------------------------------------------------------------------------------------------------------------//
//Evento para Editar Estudiantes
formularioEditar.addEventListener('submit', 
function(evento) {
    evento.preventDefault();//evita que la pagina se recargue
    
    let datos = new FormData(formularioEditar);

    let datosEnviar = {
            id: datos.get('id'),
            cedula: datos.get('cedula'),
            correoelectronico: datos.get('email'),
            telefono: datos.get('tel'),
            telefonocelular: datos.get('cel'),
            fechanacimiento: datos.get('nacimiento'),
            sexo: datos.get('sexo'),
            direccion: datos.get('direccion'),
            nombre: datos.get('nombre'),
            apellidopaterno: datos.get('apellido1'),
            apellidomaterno: datos.get('apellido2'),
            nacionalidad: datos.get('nacionalidad'),
            idCarreras: datos.get('idcarrera'),
            usuario: datos.get('usuario')
    }
    console.log(datosEnviar);

        //url + insertar esto es la url del servicio concatenada
        fetch( url + actualizar,
            {
                method: 'POST',
                body: JSON.stringify(datosEnviar)
            } 
        )
        .then(respuesta=>respuesta.json())
        .then( (datosrepuesta) => {
            mensajeActualizar(datosrepuesta)
            console.log(datosrepuesta);
            setTimeout(cargarDatos, 1000); 
            window.location.replace("Estudiantes.html");
        })
        .catch(console.log)
})

//Metodos//-------------------------------------------------------------------------------------------------------------//
function editar(objeto) {
    let modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));
    modalEditar.show();

    
    objeto = JSON.parse(decodeURIComponent(objeto));
    
    document.getElementById("id").value = objeto.id;
    document.getElementById("cedula").value = objeto.cedula;
    document.getElementById("email").value = objeto.correoelectronico;
    document.getElementById("tel").value = objeto.telefono;
    document.getElementById("cel").value = objeto.telefonocelular;
    document.getElementById("nacimiento").value = objeto.fechanacimiento;
    document.getElementById("sexo").value = objeto.sexo;
    document.getElementById("direccion").value = objeto.direccion;
    document.getElementById("nombre").value = objeto.nombre;
    document.getElementById("apellido1").value = objeto.apellidopaterno;
    document.getElementById("apellido2").value = objeto.apellidomaterno;
    document.getElementById("nacionalidad").value = objeto.nacionalidad;
    document.getElementById("idcarrera").value = objeto.idCarreras;
    document.getElementById("usuario").value = objeto.usuario;
    document.getElementById("ideditar").innerHTML = objeto.id;

}
//-------------------------------------------------------------------------------------------------------------//
//Carga los datos
function cargarDatos(){
    datosTabla.innerHTML = "";
    loadspinner();
    //url + listar esto es la url del servicio concatenada
    fetch( url + listar )
    .then(respuesta=>respuesta.json())
    .then( (datosrepuesta) => {
        //console.log(datosrepuesta)
        mostrarDatos(datosrepuesta)
    })
    .catch(console.log)
}
//-------------------------------------------------------------------------------------------------------------//
function mensajeInsertar(datos){
    if(datos.code == 200){        
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
    else{
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
//-------------------------------------------------------------------------------------------------------------//
function mensajeActualizar(datos){
    if(datos.code == 200){        
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
                <strong>Actualizacion exitosa</strong>
            </div>`;

        setTimeout(cargarDatos, 3000);    
    }
    else{
        mensajesSistema.innerHTML = `<div
                class="alert alert-danger alert-dismissible fade show"
                role="alert"
            >
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
                <strong>Error al actualizar</strong>
            </div>`;
    }
}
//-------------------------------------------------------------------------------------------------------------//
function mostrarDatos(datos){
    //console.log(datos);
    if(datos.code == 200){
        for (const iterator of datos.data) {  
        //onclick="editar('${iterator.id}', '${iterator.name}', '${iterator.password}', '${iterator.email}')"
        
            datosTabla.innerHTML += `
                <tr class="">
                    <td>
                    <a
                        name=""
                        id=""
                        class="btn btn-success"
                        onclick="editar('${encodeURIComponent(JSON.stringify(iterator))}')"
                        role="button"
                        ><span class="material-symbols-outlined">
                        edit
                        </span></a
                    >                    
                    
                    <a
                        name=""
                        id=""
                        class="btn btn-danger"                        
                        role="button"
                        onclick="eliminar('${iterator.id}')"
                        ><span class="material-symbols-outlined">
                        delete
                        </span></a
                    >
                    </td>
                    <td scope="row">${iterator.id}</td>
                    <td>${iterator.cedula}</td>
                    <td>${iterator.correoelectronico}</td>
                    <td>${iterator.telefono}</td>       
                    <td>${iterator.telefonocelular}</td>
                    <td>${iterator.fechanacimiento}</td>
                    <td>${iterator.sexo}</td> 
                    <td>${iterator.direccion}</td>       
                    <td>${iterator.nombre}</td>
                    <td>${iterator.apellidopaterno}</td>
                    <td>${iterator.apellidomaterno}</td> 
                    <td>${iterator.nacionalidad}</td>
                    <td>${iterator.idCarreras}</td> 
                    <td>${iterator.usuario}</td>       
                </tr>
                `;
        }
    }
    else{
        alert("Algo salio mal");
    }

    document.getElementById("spinnerload").innerHTML = "";
}
//-------------------------------------------------------------------------------------------------------------//
//muestra un icono de carga mientas se consume la API
function loadspinner(){
    document.getElementById("spinnerload").innerHTML = spinner;
}
//-------------------------------------------------------------------------------------------------------------//
//Metodo para eliminar estudiante
function eliminar(id){
    document.getElementById("idEliminar").innerHTML = id;
    document.getElementById("idEliminarModal").value = id;
    
    let modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));
    modalEliminar.show();
}
//-------------------------------------------------------------------------------------------------------------//
//Modal de Eliminar 
function modalEliminarConfirmacion(){
    //alert("Eliminado");
    let id = {id: document.getElementById("idEliminarModal").value}

    fetch( url + eliminarEstudiante,
        {
            method: 'POST',
            body: JSON.stringify(id)
            
        } 
        
    )
    .then(respuesta=>respuesta.json())
    .then( (datosrepuesta) => {
        console.log(id)
        setTimeout(cargarDatos, 1000); 
        window.location.replace("Estudiantes.html");
    })
    .catch(console.log)

}

//-------------------------------------------------------------------------------------------------------------//
//hace que se muestren los datos de la tabla o un mensaje de error
if (nombrePagina == nombreModuloListar ){
    cargarDatos();
}


