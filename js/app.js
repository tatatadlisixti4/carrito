const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const $$$ = (element, event, handler) => element.addEventListener(event, handler);
const $$$$ = (padre, hijo) => padre.querySelector(hijo);

const carrito = $('#carrito');
const contenedorCarrito = $('#lista-carrito tbody');
const vaciarCarritoBtn = $('#vaciar-carrito');
const listaCursos = $('#lista-cursos');

cargarEventListeners();
function cargarEventListeners() {
    $$$(listaCursos, 'click', agregarCurso);
}

function agregarCurso(e) {
    e.preventDefault(); // Prevenir evento por defecto
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement; // Voy al elemento padre del elemento padre del evento
        leerDatosCurso(cursoSeleccionado);
        /*
        nextElementSibling: Obtiene el siguiente hermano elemento del actual.
        previousElementSibling: Obtiene el hermano elemento anterior del actual.
        */
    }
}
// Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso) {

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: ($$$$(curso, 'img')).src, 
        titulo: ($$$$(curso, 'h4')).textContent, 
        precio: ($$$$(curso, '.precio span')).textContent, 
        id: ($$$$(curso, 'a')).getAttribute('data-id'), 
        cantidad: 1
    }


    console.log(infoCurso);
    
     
}
