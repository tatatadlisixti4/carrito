const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const $$$ = (element, event, handler) => element.addEventListener(event, handler);
const $$$$ = (padre, hijo) => padre.querySelector(hijo);

const carrito = $('#carrito');
const contenedorCarrito = $('#lista-carrito tbody');
const vaciarCarritoBtn = $('#vaciar-carrito');
const listaCursos = $('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners(); // Se declara primero para agilizar el entendimiento de la logica del codigo y se invocar antes de su declaracion pq son funciones declaradas y no asignadas. Js tiene 2 fases, la de hosting que es en donde se reordena el codigo manteniendo primero las variables y funciones expresamente declaradas y dps la fase de ejecucion en donde ocurre linea por linea lo que indica su nombre (ejecutar).
function cargarEventListeners() {
    // Evento boton "agregar al carrito"
    $$$(listaCursos, 'click', agregarCurso);

    // Elimina cursos del carrito
    $$$(carrito, 'click', eliminarCurso);

    // Vaciar el carrito 
    $$$(vaciarCarritoBtn, 'click', () => {
        console.log('Vaciando');
        articulosCarrito = [];  // Se resetea el arreglo del carrito
        limpiarHTML(); // Eliminamos el HTML del carrito

    });

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

function eliminarCurso(e) {
    // Aplicaremos delegation para saber a que elemento del padre que desencadenó el evento le dimos click
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        /*
        - Map se usa para tener un arreglo en base a otro pero transformando cada elemento segun convenga, el tamaño de ambos arreglos es el mismo.

        - Filter por otro lado, crea un nuevo arreglo en base a otro, pero si los elementos de este otro no cumplen un parametro, no lo toma para la cración. Esto implica que no siempre el tamaño de ambos arreglos sean el mismo

        - Some verifica si al menos un elemento de un arreglo cumple una condicion y retorna un true o false
        */

        // Elimina del arreglo de articulosCarrito el id del data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId); 
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
        
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
    // Revisa si un elemento ya está en el carrito 
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorna los objetos que no se repitieron
            }
        });
        articulosCarrito = [...cursos]; // Se le pasa una copia a articulos carrito sin afectar el array cursos
    } else {
        // Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];

    }
    // console.log(articulosCarrito);
    carritoHTML(); 
}

// Muestra el carrito de compras en el html
function carritoHTML() {

    // Limpiar el HTML para evitar volver agregar un curso.
    limpiarHTML();
    
    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, id, cantidad} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td> 
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}


// Elimina los curso del tbody
function limpiarHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}