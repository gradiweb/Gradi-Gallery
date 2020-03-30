// Constantes
const apiPath = "api/gradiAuthors.json";
const cont = 12;
// Contadores
var photosApi;
var init = 0;
var end = cont;
// Selector
let imageGrid = document.querySelector('#container');

// Cargar JSON y asignarlo a var photosApi
function loadJSON() {
    // Crear objeto para el Request 
    const apiJSON = new XMLHttpRequest();
    apiJSON.overrideMimeType("application/json");
    apiJSON.open('GET', apiPath, true);
    apiJSON.send();
    apiJSON.onreadystatechange = function () {
        // Validar estado del Request
        if (this.readyState == 4 && this.status == "200") {
            // Asignar respuesta del request
            photosApi = JSON.parse(this.responseText);
            // Agregar las primeras imagenes al DOM
            addToDom(photosApi.slice(init, end));
        }
    };
}

// Agregar mas objetos al DOM
const addToDom = photos => {
    photos.forEach(photo => {
        // Crear estryctura del elemento
        let el = document.createElement("div");
        el.classList.add('image-item');
        el.innerHTML =
        `<img src="${photo.download_url}">
            <div class="overlay">
                <h3>${photo.id}</h3>
                <h3>${photo.author}</h3>
            </div>`;
        imageGrid.appendChild(el);
    });
    // Aumentar contadores
    init = init + cont;
    end = end + cont;
};

// Validar tamaño del scroll 
window.addEventListener('scroll', function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        // Ejecutar función para agregar objetos al DOM
        addToDom(photosApi.slice(init, end));
    }
});

// Inicializar API
loadJSON();