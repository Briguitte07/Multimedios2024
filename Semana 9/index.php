<?php

    $texto = "Mi nombre es: ";
    $numero = 123;
    $decimal = 1.2;
    $nombre = "Mario";
    $arreglo  = array(12, "Mario", true, 1.29);


    function imprimir(){
        echo "Soy la funcion de impresion";
    }
    function suma($a, $b){
        return $a + $b;
    }

?>


<!doctype html>
<html lang="en">
    <head>
        <title>Inicio</title>
        <!-- Required meta tags -->
        <meta charset="utf-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <!-- Bootstrap CSS v5.2.1 -->
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
            crossorigin="anonymous"
        />
    </head>

    <body>
        <header>
            <?php


                echo "<h2>Nuevo Texto desde php</h2>";
                echo $texto , " ", $nombre;
            ?>
        </header>
        
            <h1>Pagina de inicio</h1>

            <?php
                echo "Me permite imprimir en el html";
                echo '
                <div class="card text-start">
                    <img class="card-img-top" src="holder.js/100px180/" alt="Title" />
                    <div class="card-body">
                        <h4 class="card-title">Title</h4>
                        <p class="card-text">Body</p>
                    </div>
                </div>';

                var_dump( $arreglo );
            ?>
        </main>
        <footer>
            <!-- place footer here -->
            <?php

                imprimir();

                echo suma(98,90);
            ?>
        </footer>
        <!-- Bootstrap JavaScript Libraries -->
        <script
            src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
            integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
            crossorigin="anonymous"
        ></script>

        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
            integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
            crossorigin="anonymous"
        ></script>
    </body>
</html>