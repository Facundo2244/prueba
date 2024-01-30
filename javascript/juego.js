//creación de variables


const pregunta = document.getElementById('pregunta');
const opciones = Array.from(document.getElementsByClassName('opcionTexto'));
const textoProgreso = document.getElementById('textoProgreso');
const textoPuntaje = document.getElementById('puntaje');
const barraProgresoLlena = document.getElementById('barraProgresoLlena');
const puntajeSuma = 10;
const totalRespuestas = 10;
let preguntaActual = {};
let respuestaCorrecta = false;
let puntaje = 0;
let contPreguntas = 0;
let pregDisponibles = [];
let preguntas = [];


//uso de fetch para traer las preguntas desde un json local
fetch('../json/preguntas.json')
    .then((res) => {
        return res.json();
    })
    .then((cargarPreguntas) => {
        preguntas = cargarPreguntas;
        iniciarJuego();
    })
    .catch((err) => {
        console.error(err);
    });

//funciones

// cada vezque se inicia el juego se reincian los contadores y se llama a la funcion nuevapregunta

iniciarJuego = () => {
    contPreguntas = 0;
    puntaje = 0;
    pregDisponibles = [...preguntas];
    nuevaPregunta();
};

//llama a una nueva pregunta mientras que las preguntas disponibles no sean 0 o el total de preguntas sea menor a la cantidad de preguntas hechas.

nuevaPregunta = () => {
    if (pregDisponibles.length === 0 || contPreguntas >= totalRespuestas) {
        localStorage.setItem('ultimoPuntaje', puntaje);
        
        return window.location.assign('../pages/pantalla-final.html');
    }
    contPreguntas++;
    textoProgreso.innerText = `Pregunta ${contPreguntas} de ${totalRespuestas}`;
    barraProgresoLlena.style.width = `${(contPreguntas / totalRespuestas) * 100}%`;

    const pregIndice = Math.floor(Math.random() * pregDisponibles.length);
    preguntaActual = pregDisponibles[pregIndice];
    pregunta.innerText = preguntaActual.pregunta;

    opciones.forEach((opcion) => {
        const numero = opcion.dataset['numero'];
        opcion.innerText = preguntaActual['opcion' + numero];
    });

    pregDisponibles.splice(pregIndice, 1);
    respuestaCorrecta = true;
};

//funcion para actualizar las opciones y asignar una clase (color rojo o verde) según corresponda ante una respuesta correcta o incorrecta.

opciones.forEach((opcion) => {
    opcion.addEventListener('click', (e) => {
        if (!respuestaCorrecta) return;
        
        

        respuestaCorrecta = false;
        const opcionSelec = e.target;
        const respuestaSelec = opcionSelec.dataset['numero'];

        const claseCorresponde =
            respuestaSelec == preguntaActual.respuesta ? 'correcta' : 'incorrecta';

        if (claseCorresponde === 'correcta') {
            sumarPuntaje(puntajeSuma)
//librería sweetAlert para indicar el resultado de la respuesta y brindar más información sobre ella al usuario.
            Swal.fire({
                title: "Respuesta Correcta!",
                text: preguntaActual.info,
                imageUrl: preguntaActual.imagen,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image"
              });
;
            
        }
        else{
            Swal.fire({
                title: "Respuesta incorrecta!",
                text: preguntaActual.info,
                imageUrl: preguntaActual.imagen,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image"
              });
        }

        opcionSelec.parentElement.classList.add(claseCorresponde);
//setTimeout utilizado para que una vez clickeada la opción, el juego pase de pregunta.

        setTimeout(() => {
            opcionSelec.parentElement.classList.remove(claseCorresponde);
            nuevaPregunta();
        }, 1000);
    });
});

sumarPuntaje = (num) => {
    puntaje += num;
    textoPuntaje.innerText = puntaje;
};
