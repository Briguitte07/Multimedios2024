///Sección del Login

//Propiedades
let autenticar = "AutenticarUsuario.php" 
let url = "https://paginas-web-cr.com/Api/apis/";

const token = localStorage.getItem('token');

//Eventos
    formulario.addEventListener('submit', 
    function(evento) { 
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        evento.preventDefault();//evita que la pagina se recargue
        // Crea un objeto FormData a partir del formulario
        let datos = new FormData(formulario);
        // Crea un objeto con los datos del formulario
        let datosEnviar = {
            email: datos.get('email'),
            password: datos.get('password')
        };
        //url + insertar esto es la url del servicio concatenada
        // Hace una solicitud POST a la API de autenticación
        fetch( url + autenticar,
            {
                method: 'POST',
                body: JSON.stringify(datosEnviar)
            } 
        )
        .then(respuesta=>respuesta.json())
        .then( (datosrepuesta) => {
            //console.log(datosrepuesta);
            //Verificar si la operacion fue exitosa
            if(datosrepuesta.data){
                guardarTokenEnLocalStorage(datosrepuesta,evento) 
                //window.location.href = "../Index.html";
            }else{
                if(password == '' || email == ''){
                    alert("por favor llene los campos");
                }else{
                    alertaLogin(datosrepuesta.code);
                }
                localStorage.removeItem("token");
            }
           
        })
        .catch(console.log)
        
    })


//Eventos
//Inyección de código 
function escapeHTML(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }
  
  
  function agregar(){
      let email = document.getElementById('email').value;
      email= escapeHTML(email);
      console.log(email);
  }

  function guardarTokenEnLocalStorage(respuesta,evento) {
    const token = btoa(JSON.stringify(respuesta));
    localStorage.setItem("token", token);
    verificarTokenEnLocalStorage(evento);
  }
  
  function alertaLogin(code){
    if(code == 404){
       alert("Usuario o contraseña incorrecta");
    }
  }

function verificarTokenEnLocalStorage(event) {
    const token = localStorage.getItem("token");
    event.preventDefault();
    if (token) {
      // Si hay un token, redirigir al index
      window.location.href = "index.html";
    } 
  }
  
  // Llamada a la función para verificar el token al cargar la página
