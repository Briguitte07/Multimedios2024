
///Creación del Menu
let menu = `<ul
class="nav nav-tabs"
id="navId"
role="tablist"
>
<li class="nav-item">
    <a
        href="index.html"
        class="nav-link active"
        data-bs-toggle="tab"
        aria-current="page"
        >Home</a
    >
</li>
<li class="nav-item dropdown">
    <a
        class="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        href="#"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
        >Usuarios</a
    >
    <div class="dropdown-menu">
        <a class="dropdown-item" href="ListaUsuarios.html">Lista Usuarios</a>
        <a class="dropdown-item" href="CrearUsuarios.html">Crear Usuario</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#tab4Id">Action</a>
    </div>
</li>
<li class="nav-item" role="presentation">
    <a href="#tab5Id" class="nav-link" data-bs-toggle="tab"
        >Another link</a
    >
</li>
<li class="nav-item" role="presentation">
    <a href="#" class="nav-link disabled" data-bs-toggle="tab"
        >Disabled</a
    >
</li>
</ul>`;

//Selecciona un elemento del documento HTML con el atributo id
document.getElementById("menu").innerHTML = menu;

///Creación del Footer
let footer= `
<div class="container">
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <p class="col-md-4 mb-0 text-muted">© 2024 Multimedios-01, UCR</p>

    <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
    </a>

    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Pricing</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
    </ul>
  </footer>
</div>
`;

///Selecciona un elemento del documento HTML con el atributo id 
document.getElementById("footer").innerHTML = footer;