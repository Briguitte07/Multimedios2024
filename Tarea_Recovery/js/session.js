//Verificacion------------------------------------------------------------//
function verificarTokenEnLocalStorage(event) {
    const token = localStorage.getItem("token");
    event.preventDefault();
    if (!token) {
        alert("Debes iniciar sesión primero");
        // Redirigir al login
        window.location.href = "Login.html";
    } 
  }
  
  //-----------------------------------------------------------------------------------------------------//
  // Llamada a la función para verificar el token al cargar la página
  document.addEventListener("DOMContentLoaded", verificarTokenEnLocalStorage);

  function logOut(){
    localStorage.removeItem("token");
    window.location.href = "Login.html";
    alert("Sesión Finalizada");
  }