//Propiedades 

$(document).ready(function() {
    $('#formulario').on('submit', function(event) {
        event.preventDefault();

        const email = $('#email').val();
        const requestData = {
            email: email
        };
        $.ajax({
            url: 'https://paginas-web-cr.com/Api/apis/SendPassword.php',
            type: 'POST',
            contentType: 'application/json', 
            data: JSON.stringify(requestData),
            success: function(response, textStatus, xhr) {
                if (xhr.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "¡Contraseña enviada!",
                        showConfirmButton: false,
                        timer: 3000
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Usuario no encontrado",
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            },
            error: function(xhr, status, error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Error al enviar la solicitud",
                    text: "Por favor, inténtalo de nuevo más tarde.",
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        });
    });

    $('#atras').on('click', function(event) {
        event.preventDefault();
        volverPaginaAnterior();
    });
});

function volverPaginaAnterior() {
    const paginaAnterior = document.referrer;
    if (paginaAnterior) {
        window.location.href = paginaAnterior;
    } else {
        window.location.href = "/";
    }
}