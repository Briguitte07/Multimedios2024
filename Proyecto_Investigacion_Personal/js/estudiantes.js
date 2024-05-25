//Propiedades
let $datosTabla = $('#datos');
let $mensajesSistema = $('#mensajesSistema');
let $formulario = $('#formulario');
let $formularioEditar = $('#formularioEditar');


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
    $('#formulario').on('submit', function(evento) {
        evento.preventDefault(); // Evita que la página se recargue
        
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

        $.ajax({
            url: url + insertar,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datosEnviar),
            success: function(datosrepuesta) {
                console.log(datosrepuesta);
                mensajeInsertar(datosrepuesta);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });
}
//-------------------------------------------------------------------------------------------------------------//
//Evento para Editar Estudiantes
$('#formularioEditar').on('submit', function(evento) {
    evento.preventDefault(); // Evita que la página se recargue
    
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
        $.ajax({
            url: url + actualizar,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datosEnviar),
            success: function(datosrepuesta) {
                mensajeActualizar(datosrepuesta);
                console.log(datosrepuesta);
                setTimeout(cargarDatos, 1000); 
                window.location.replace("Estudiantes.html");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
});

//Metodos//-------------------------------------------------------------------------------------------------------------//
function editar(objeto) {
    let modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));
    modalEditar.show();

    
    objeto = JSON.parse(decodeURIComponent(objeto));
    
    $("#id").val(objeto.id);
    $("#cedula").val(objeto.cedula);
    $("#email").val(objeto.correoelectronico);
    $("#tel").val(objeto.telefono);
    $("#cel").val(objeto.telefonocelular);
    $("#nacimiento").val(objeto.fechanacimiento);
    $("#sexo").val(objeto.sexo);
    $("#direccion").val(objeto.direccion);
    $("#nombre").val(objeto.nombre);
    $("#apellido1").val(objeto.apellidopaterno);
    $("#apellido2").val(objeto.apellidomaterno);
    $("#nacionalidad").val(objeto.nacionalidad);
    $("#idcarrera").val(objeto.idCarreras);
    $("#usuario").val(objeto.usuario);
    $("#ideditar").text(objeto.id);


}
//-------------------------------------------------------------------------------------------------------------//
//Carga los datos
function cargarDatos(){
    $("#datosTabla").empty(); // Limpia el contenido de datosTabla
    loadspinner();

    $.ajax({
        url: url + listar,
        method: 'GET',
        dataType: 'json',
        success: function(datosrepuesta) {
            //console.log(datosrepuesta)
            mostrarDatos(datosrepuesta);
        },
        error: function(error) {
            console.log(error);
        }
    });
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
    console.log(datos); // Verificar la estructura de datos
    if (datos.code == 200) {
        $.each(datos.data, function(index, iterator) {
            $datosTabla.append(`
                <tr class="">
                    <td>
                        <a name="" id="" class="btn btn-success" onclick="editar('${encodeURIComponent(JSON.stringify(iterator))}')" role="button">
                            <span class="material-symbols-outlined">edit</span>
                        </a>
                        <a name="" id="" class="btn btn-danger" onclick="eliminar('${iterator.id}')" role="button">
                            <span class="material-symbols-outlined">delete</span>
                        </a>
                    </td>
                    <td>${iterator.id}</td>
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
            `);
        });
    } else {
        alert("Algo salio mal");
    }
    $("#spinnerload").empty();
}
//-------------------------------------------------------------------------------------------------------------//
//muestra un icono de carga mientas se consume la API
function loadspinner(){
    $("#spinnerload").html(spinner); // Esto mostrará el spinner de carga
}
//-------------------------------------------------------------------------------------------------------------//
//Metodo para eliminar estudiante
function eliminar(id){
    $("#idEliminar").text(id); 
    $("#idEliminarModal").val(id); 
    
    let modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));
    modalEliminar.show();
}
//-------------------------------------------------------------------------------------------------------------//
//Modal de Eliminar 
function modalEliminarConfirmacion(){
   // Obtiene el valor del input con jQuery
   let id = { id: $("#idEliminarModal").val() };

   // Realiza la solicitud de eliminación utilizando jQuery AJAX
   $.ajax({
       url: url + eliminarEstudiante,
       method: 'POST',
       contentType: 'application/json',
       data: JSON.stringify(id),
       success: function(datosrepuesta) {
           console.log(id);
           setTimeout(cargarDatos, 1000);
           window.location.replace("Estudiantes.html");
       },
       error: function(err) {
           console.log(err);
       }
   });

}

//-------------------------------------------------------------------------------------------------------------//
//hace que se muestren los datos de la tabla o un mensaje de error
if (nombrePagina == nombreModuloListar ){
    cargarDatos();
}


