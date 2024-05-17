//Menu
//Barra Menu
let menu = ` <nav class="navbar navbar-expand-lg navbar-light bg-light">
<div class="container-fluid">
  <a class="navbar-brand" href="index.html">Bienvenido</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="index.html">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="Estudiantes.html">Estudiantes</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="Profesores.html">Profesores</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="Grupos.html">Grupos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="Cursos.html">Cursos</a>
      </li>
    </ul>
  </div>
</div>
</nav>`;

document.getElementById("contenedorMenu").innerHTML = menu;

//Footer
// Initialization for ES Users
//import { Ripple, initMDB } from "mdb-ui-kit";
//initMDB({ Ripple });

let pie = `<footer class="text-center bg-body-tertiary">

<!-- Copyright -->
<div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.05);">
  © 2020 Copyright:
  <a class="text-body" href="https://mdbootstrap.com/">MDBootstrap.com</a>
</div>
<!-- Copyright -->
</footer>`;

document.getElementById("contenedorFooter").innerHTML = pie;
