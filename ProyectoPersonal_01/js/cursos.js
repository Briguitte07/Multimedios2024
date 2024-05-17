//Propiedades
let datosTabla = document.querySelector('#datos');//Cuando es queryselector requiere el #
let mensajesSistema =  document.querySelector('#mensajesSistema');
let formulario = document.getElementById('formulario');//Cuando es id, no requiere el #
let formularioEditar = document.getElementById('formularioEditar');


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
if ( nombrePagina == nombreModuloCrear ){
    formulario.addEventListener('submit', 
    function(evento) {
        evento.preventDefault();//evita que la pagina se recargue
        
        let datos = new FormData(formulario);
        
        let datosEnviar = {
            nombre: datos.get('nombre'),
            descripcion: datos.get('descripcion'),
            tiempo: datos.get('tiempo'),
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
            console.log(datosrepuesta)
            mensajeInsertar(datosrepuesta)
        })
        .catch(console.log)

    })
}
//-------------------------------------------------------------------------------------------------------------//
//Evento para Editar Curso
formularioEditar.addEventListener('submit', 
function(evento) {
    evento.preventDefault();//evita que la pagina se recargue
    
    let datos = new FormData(formularioEditar);

    let datosEnviar = {
            id: datos.get('id'),
            nombre: datos.get('nombre'),
            descripcion: datos.get('descripcion'),
            tiempo: datos.get('tiempo'),
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
            window.location.replace("Cursos.html");
        })
        .catch(console.log)
})

//Metodos//-------------------------------------------------------------------------------------------------------------//
function editar(objeto) {
    let modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));
    modalEditar.show();

    
    objeto = JSON.parse(decodeURIComponent(objeto));
    
    document.getElementById("id").value = objeto.id;
    document.getElementById("nombre").value = objeto.nombre;
    document.getElementById("descripcion").value = objeto.descripcion;
    document.getElementById("tiempo").value = objeto.tiempo;
    document.getElementById("usuario").value = objeto.usuario;
    document.getElementById("ideditar").innerHTML = objeto.id;

}
//-------------------------------------------------------------------------------------------------------------//
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
                    <td>${iterator.nombre}</td>
                    <td>${iterator.descripcion}</td>
                    <td>${iterator.tiempo}</td>       
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

    fetch( url + eliminarCurso,
        {
            method: 'POST',
            body: JSON.stringify(id)
        } 
    )
    .then(respuesta=>respuesta.json())
    .then( (datosrepuesta) => {
        console.log(id)
        //mensajeInsertar(datosrepuesta)
        setTimeout(cargarDatos, 1000); 
        //document.getElementById('modalEliminar').hidden = true; // Cerrar el modal
        window.location.replace("Cursos.html");
    })
    .catch(console.log)

}
//-------------------------------------------------------------------------------------------------------------//
//hace que se muestren los datos de la tabla o un mensaje de error
if (nombrePagina == nombreModuloListar ){
    cargarDatos();
}
