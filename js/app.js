const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const $$$ = (element, event, handler) => element.addEventListener(event, handler);

const carrito = $('#carrito');
const contenedorCarrito = $('#lista-carrito tbody');
const vaciarCarritoBtn = $('#vaciar-carrito');
const listaCursos = $('#lista-cursos');

cargarEventListeners();
function cargarEventListeners() {
    $$$(listaCursos, 'click', agregarCurso);
}

function agregarCurso() {
    console.log('Presionando en cursos');
    
}