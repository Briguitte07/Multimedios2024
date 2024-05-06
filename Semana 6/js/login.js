///Sección del Login

//Propiedades
const email = document.getElementById('email');
const password = document.getElementById('password');
//const login = document.getElementById('login');

let autenticar = "AutenticarUsuario.php" 
let url = "https://paginas-web-cr.com/Api/apis/";


//Eventos
    formulario.addEventListener('submit', 
    function(evento) {
        evento.preventDefault();//evita que la pagina se recargue
        
        let datos = new FormData(formulario);
        
        let datosEnviar = {
            password: datos.get(password),
            email: datos.get(email)

        }

        console.log(datosEnviar);

        //url + insertar esto es la url del servicio concatenada
        fetch( url + autenticar,
            {
                method: 'POST',
                body: JSON.stringify(datosEnviar)
            } 
        )
        .then(respuesta=>respuesta.json())
        .then( (datosrepuesta) => {
            console.log(datosrepuesta)
           
        })
        .catch(console.log)

    })


//Metodos
