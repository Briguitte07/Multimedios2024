//Propiedades
let $datosTabla = $('#datos');
let $mensajesSistema = $('#mensajesSistema');
let $formulario = $('#formulario');
let $formularioEditar = $('#formularioEditar');


let nombrePagina = document.title;
let nombreModuloListar = "Cursos";
let nombreModuloCrear = "Agregar Curso";

let url = "https://paginas-web-cr.com/Api/apis/";
let listar = "ListaCurso.php";
let insertar = "InsertarCursos.php";
let actualizar = "ActualizarCursos.php";
let eliminarCurso = "BorrarCursos.php";

let spinner = `
<button class="btn btn-success" type="button" disabled>
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span role="status">Loading...</span>
</button>`;
//Eventos//-------------------------------------------------------------------------------------------------------------//
//Evento para guardar formulario
if (nombrePagina == nombreModuloCrear) {
    $('#formulario').on('submit', function(evento) {
        evento.preventDefault(); // Evita que la página se recargue
        
        let datos = new FormData(this);
        
        let datosEnviar = {
            nombre: datos.get('nombre'),
            descripcion: datos.get('descripcion'),
            tiempo: datos.get('tiempo'),
            usuario: datos.get('usuario')
        };

        // url + insertar esto es la url del servicio concatenada
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
//Evento para Editar Curso
$('#formularioEditar').on('submit', function(evento) {
    evento.preventDefault(); // Evita que la página se recargue
    
    let datos = new FormData(this);

    let datosEnviar = {
        id: datos.get('id'),
        nombre: datos.get('nombre'),
        descripcion: datos.get('descripcion'),
        tiempo: datos.get('tiempo'),
        usuario: datos.get('usuario')
    };
    console.log(datosEnviar);

    // url + actualizar esto es la url del servicio concatenada
    $.ajax({
        url: url + actualizar,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(datosEnviar),
        success: function(datosrepuesta) {
            mensajeActualizar(datosrepuesta);
            console.log(datosrepuesta);
            setTimeout(cargarDatos, 1000); 
            window.location.replace("Cursos.html");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
});


//Metodos//-------------------------------------------------------------------------------------------------------------//
function editar(objeto) {
    // Mostrar el modal
    let modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));
    modalEditar.show();

    // Parsear el objeto
    objeto = JSON.parse(decodeURIComponent(objeto));
    
    // Usar jQuery para actualizar los valores del formulario
    $("#id").val(objeto.id);
    $("#nombre").val(objeto.nombre);
    $("#descripcion").val(objeto.descripcion);
    $("#tiempo").val(objeto.tiempo);
    $("#usuario").val(objeto.usuario);
    $("#ideditar").text(objeto.id);
}

//-------------------------------------------------------------------------------------------------------------//
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
function mostrarDatos(datos) {
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
                    <td scope="row">${iterator.id}</td>
                    <td>${iterator.nombre}</td>
                    <td>${iterator.descripcion}</td>
                    <td>${iterator.tiempo}</td>
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
function loadspinner() {
    $("#spinnerload").html(spinner); // Esto mostrará el spinner de carga
}

//-------------------------------------------------------------------------------------------------------------//
//Metodo para eliminar 
function eliminar(id) {
    $("#idEliminar").text(id); // Establece el contenido del elemento con ID "idEliminar" con el valor de "id"
    $("#idEliminarModal").val(id); // Establece el valor del input con ID "idEliminarModal" con el valor de "id"

    let modalEliminar = new bootstrap.Modal($("#modalEliminar")[0]); // Obtiene el modal con jQuery y lo convierte a un elemento de DOM
    modalEliminar.show(); // Muestra el modal
}

//-------------------------------------------------------------------------------------------------------------//
//Modal de Eliminar 
function modalEliminarConfirmacion() {
    // Obtiene el valor del input con jQuery
    let id = { id: $("#idEliminarModal").val() };

    // Realiza la solicitud de eliminación utilizando jQuery AJAX
    $.ajax({
        url: url + eliminarCurso,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(id),
        success: function(datosrepuesta) {
            console.log(id);
            //mensajeInsertar(datosrepuesta);
            setTimeout(cargarDatos, 1000);
            // Cierra el modal (si es necesario)
            // $('#modalEliminar').modal('hide');
            // Redirecciona a la página de Cursos.html
            window.location.replace("Cursos.html");
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
