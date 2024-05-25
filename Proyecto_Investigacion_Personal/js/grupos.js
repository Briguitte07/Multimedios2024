//Propiedades
let $datosTabla = $('#datos');//Cuando es queryselector requiere el #
let $mensajesSistema = $('#mensajesSistema');
let $formulario = $('formulario');//Cuando es id, no requiere el #
let $formularioEditar = $('formularioEditar');

let nombrePagina = document.title;
let nombreModuloListar = "Grupos";
let nombreModuloCrear = "Agregar Grupo";

let url = "https://paginas-web-cr.com/Api/apis/";
let listar = "ListaGrupo.php";
let insertar = "InsertarGrupo.php";
let actualizar = "ActualizarGrupo.php";
let eliminarGrupo = "BorrarGrupo.php";


let spinner = `
<button class="btn btn-success" type="button" disabled>
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span role="status">Loading...</span>
</button>`;
//Eventos//-------------------------------------------------------------------------------------------------------------//
//Evento para Guardar datos del Formulario
if ( nombrePagina == nombreModuloCrear ){
    $('#formulario').on('submit', 
    function(evento) {
        evento.preventDefault();//evita que la pagina se recargue
        
        let datos = new FormData(formulario);
        
        let datosEnviar = {
            nombre: datos.get('nombre')
        }

        //url + insertar esto es la url del servicio concatenada
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
//Evento para Editar Grupos
$('#formularioEditar').on('submit', function(evento) {
    evento.preventDefault(); // Evita que la página se recargue
    
    let datos = new FormData(this);

    let datosEnviar = {
        id: datos.get('id'),
        nombre: datos.get('nombre')
        
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
            window.location.replace("Grupos.html");
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
    $("#nombre").val(objeto.nombre);
    $("#ideditar").text(objeto.id);

}
//Metodos//-------------------------------------------------------------------------------------------------------------//
function cargarDatos(){
    $("#datosTabla").empty(); // Limpia el contenido de datosTabla
    loadspinner();

    //url + listar esto es la url del servicio concatenada
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
    console.log(datos);
    if(datos.code == 200){
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
//Metodo para eliminar grupo
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
        url: url + eliminarGrupo,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(id),
        success: function(datosrepuesta) {
            console.log(id);
            setTimeout(cargarDatos, 1000);
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

