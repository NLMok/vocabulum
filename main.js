let arrayPalabra = [];

function nuevaPalabra(significante, clase, traduccion, definicion, categoria) {
    this.significante = significante;
    this.clase = clase;
    this.traduccion = traduccion;
    this.definicion = definicion;
    this.categoria = categoria;
}

let arrayCategoria = [];

let significante = document.querySelector(`.nuevoSignificante`);
let clase = document.querySelector(`.clase`);
let traduccion = document.querySelector(`.traduccion`);
let definicion = document.querySelector(`.definicion`);
let categoria = document.querySelector(`.categoria`);
let errorNodes = document.querySelectorAll(`.error`);
let agregada = document.querySelector('.agregada');
let categoriasUsadas = document.querySelector('.categoriasUsadas');

let formulario = document.querySelector('.formulario');
formulario.addEventListener('submit', validarFormulario);
formulario.addEventListener('submit',cargarDatos);

function validarFormulario(evt){
    evt.preventDefault();
    limpiarAlerta()

    if(significante.value.length <1){
        errorNodes[0].innerText="Debés completar con la nueva palabra.";
        significante.classList.add("bordeError");
    }
    if(traduccion.value.length <1){
        errorNodes[1].innerText="Debés completar con la traducción.";
        traduccion.classList.add("bordeError")
    }
    if(categoria.value.length <1){
        errorNodes[2].innerText="Debés completar con una categoría.";
        categoria.classList.add("bordeError")
    }
}
function limpiarAlerta(){
    for(let i = 0; i<errorNodes.length;i++){
        errorNodes[i].innerText="";
    }
    significante.classList.remove("bordeError");
    traduccion.classList.remove("bordeError");
    categoria.classList.remove("bordeError");
}

function cargarDatos(evt){
    evt.preventDefault();

    if(significante.value != '' && clase.value != '' && traduccion.value != '' && categoria.value != ''){
        arrayPalabra.push(new nuevaPalabra(significante.value.toLowerCase(), clase.value.toLowerCase(), traduccion.value, definicion.value, categoria.value.toLowerCase()));
        $('.menu').show(2000); //Animacion
        agregada.innerText = "Palabra agregada."
        if(categoria.value != ''){
            arrayCategoria.push(categoria.value.toLowerCase());
        }
    }
    let arrayPalabraJSON = JSON.stringify(arrayPalabra);
    localStorage.setItem('listado', arrayPalabraJSON);
    let arrayCategoriaJSON = JSON.stringify(arrayCategoria);
    localStorage.setItem('categorias', arrayCategoriaJSON);
    formulario.reset();
}
function ordenar(){
    arrayPalabra.sort((a,b)=>{if (a.significante.toLowerCase()==b.significante.toLowerCase()){return 0;}else if (a.significante.toLowerCase()<b.significante.toLowerCase()){return -1}else{return 1}});
    arrayCategoria.sort((a,b)=>{if (a.categoria==b.categoria){return 0;}else if (a.categoria<b.categoria){return -1}else{return 1}})
}
function ordenarMeta(){
    arrayPalabra.sort((a,b)=>{if (a.traduccion.toLowerCase()==b.traduccion.toLowerCase()){return 0;}else if (a.traduccion.toLowerCase()<b.traduccion.toLowerCase()){return -1}else{return 1}});
}

//inserción de las planillas en el HTML dentro del div.planillas
let btnInicio = document.querySelector('.inicio');
let btnLenguaPartida = document.querySelector('.lenguaPartida');
let btnLenguaMeta = document.querySelector('.lenguaMeta');
let planilla = document.querySelector('.planillas');
let txtVerCategorias = document.querySelector('.txtVerCategorias');

btnInicio.addEventListener('click',crearPlanillaInicio);
btnLenguaPartida.addEventListener('click',crearPlanillalenguaPartida);
btnLenguaMeta.addEventListener('click',crearPlanillaLenguaMeta);
txtVerCategorias.addEventListener('mouseover',crearPlanillaCategoria)

//funciones de creacion de las diferentes planillas
function crearPlanillaInicio(){
    planilla.innerHTML = '';
    planilla.innerHTML = `<h2>Planilla completa</h2>
                        <p class="titularPlanilla"><b>Palabra</b> | <i>Clase de palabra</i> | <i>Traducción</i> | Definición | <b>Categoría</b></p>`;
    arrayPalabra.forEach((element) =>{
        planilla.innerHTML += `<div class='listadoInicio'>
                                    <div class='subDivSignificante'><p>${element.significante}</div>
                                    <div class='subDivClase'>${element.clase}</div>
                                    <div class='subDivTraduccion'>${element.traduccion}</div>
                                    <div class='subDivDefinicion'>| ${element.definicion}</div>
                                    <div class='subDivCategoria'>|${element.categoria}</div>
                                    <div class='subDivEliminar'>
                                        <input type="submit" value="&#9447;" class="btnEliminar" data-id=${element.significante}${element.clase}${element.traduccion}>
                                    </div>
                                </div>`;
        ordenar();
    });
    $('.planillas').fadeIn(3000)
}

function crearPlanillalenguaPartida(){
    planilla.innerHTML = '';
    planilla.innerHTML = `<h2>Planilla italiano-español</h2>
                        <p class="titularPlanilla"><b>Palabra</b> | <i>Clase de palabra</i> | <i>Traducción</i> | <b>Categoría</b></p>`;
    arrayPalabra.forEach((element) =>{
        planilla.innerHTML += `<div class='listado'>
                                    <p><b>${element.significante}</b>: <i>(${element.clase})</i> <i>${element.traduccion}</i> | <b>${element.categoria}</b><input type="submit" value="&#9447;" class="btnEliminar" data-id=${element.significante}${element.clase}${element.traduccion}></p>
                                </div>`;
    });
    $('.planillas').fadeIn(3000)
}

function crearPlanillaLenguaMeta(){
    planilla.innerHTML = '';
    planilla.innerHTML = `<h2>Planilla español-italiano</h2> 
                        <p class="titularPlanilla"><b>Palabra</b> | <i>Clase de palabra</i> |  <i>Traducción</i> | <b>Categoría</b></p>`;
    ordenarMeta();
    arrayPalabra.forEach((element) =>{
        planilla.innerHTML += `<div class='listado'>
                                    <p><b>${element.traduccion}</b>: <i>(${element.clase})</i> <i>${element.significante}</i> | <b>${element.categoria}</b><input type="submit" value="&#9447;" class="btnEliminar" data-id=${element.significante}${element.clase}${element.traduccion}></p>
                                </div>`;
        
    });
    $('.planillas').fadeIn(3000)
}

function crearPlanillaCategoria(evt){
    evt.preventDefault();
    let arrayCategoriaFiltrado = arrayCategoria.filter((item,index)=>{
        return arrayCategoria.indexOf(item) === index;
    });
    $('.categoriasUsadas').fadeIn(1000).delay(5000).fadeOut(1000);
    if(arrayCategoria.length==0){
        categoriasUsadas.innerHTML = '<div><p>Aún no hay ninguna.</p></div>';
    }
    else{
        categoriasUsadas.innerHTML = '';
        arrayCategoriaFiltrado.forEach((element)=>{
            categoriasUsadas.innerHTML+= `<div><p>${element}</p></div>`;
        });
    }
}

const eliminarPalabra = (evt)=>{
    let palabraEnPlanilla = evt.target.getAttribute('data-id');
    arrayPalabra = arrayPalabra.filter((element)=>element.significante + element.clase + element.traduccion != palabraEnPlanilla);
    crearPlanillaInicio();
    let arrayPalabraJSON = JSON.stringify(arrayPalabra);
    localStorage.setItem('listado', arrayPalabraJSON);
}

let restauracionListado = document.querySelector('.restauracion');
let planillaLocalStorage = JSON.parse(localStorage.getItem('listado'));
let restauracionCategorias= document.querySelector('.restauracion');
let categoriaLocalStorage = JSON.parse(localStorage.getItem('categorias'));

restauracionListado.addEventListener('click',(evt) =>{
    if(evt.target.classList.contains('btnRestaurar')){
    restaurarPlanilla(arrayPalabra);
    }
});


function restaurarPlanilla(){
planilla.innerHTML = '';
    planilla.innerHTML = `<h2>Planilla restaurada.</h2>
                        <p>Cliqueá el botón lengua de partida o lengua meta</p>`;
    planillaLocalStorage.forEach((element) =>{
        arrayPalabra.push(new nuevaPalabra(element.significante, element.clase, element.traduccion, element.definicion, element.categoria));
    });
    categoriaLocalStorage.forEach((element) =>{
        arrayCategoria.push(element)
    });
        ordenar();
        $('.menu').show(2000);
};

//para encontrar el los botones de eliminar una vez generado
planilla.addEventListener('click',(evt) =>{
    if(evt.target.classList.contains('btnEliminar')){
        eliminarPalabra(evt);
    }
});

//Ejercitaciones
//Palabra aleatoria
let btnMostrarPalabraLP = document.querySelector('.btnPalabraAleatoriaLP');
let btnNuevaPalabraAleatoriaLP = document.querySelector('.btnNuevaPalabraAleatoriaLP')
let btnTerminarPalabraAleatoriaLP = document.querySelector('.btnTerminarPalabraAleatoriaLP');
let contenedorPalabraAleatoriaLP = document.querySelector('.palabraAleatoriaLP');
btnMostrarPalabraLP.addEventListener('click',mostrarPalabraAleatoriaLP);
btnNuevaPalabraAleatoriaLP.addEventListener('click',mostrarPalabraAleatoriaLP)
btnTerminarPalabraAleatoriaLP.addEventListener('click', terminarRepasoLP);


function mostrarPalabraAleatoriaLP(){
    let arraySignificante = arrayPalabra.map(arrayPalabra => arrayPalabra.significante)
    let arrayTraduccion = arrayPalabra.map(arrayPalabra => arrayPalabra.traduccion)
    let aleatorio = Math.floor(Math.random() * arrayPalabra.length);
    contenedorPalabraAleatoriaLP.innerHTML=`<div class="contenedorSignificanteLP">${arraySignificante[aleatorio]}</div>
    <div class="contenedorTraduccionLP">${arrayTraduccion[aleatorio]}</div>`;
    $('.contenedorSignificanteLP').fadeIn(1000);
    $('.contenedorTraduccionLP').delay(8000).fadeIn(1000)

    $('.btnNuevaPalabraAleatoriaLP').show()
    $('.btnTerminarPalabraAleatoriaLP').show()
    $('.btnPalabraAleatoriaLP').hide()
}

function terminarRepasoLP(){
    contenedorPalabraAleatoriaLP.innerHTML= '';
    $('.btnTerminarPalabraAleatoriaLP').hide()
    $('.btnNuevaPalabraAleatoriaLP').hide()
    $('.btnPalabraAleatoriaLP').show()
}

let btnMostrarPalabraLM = document.querySelector('.btnPalabraAleatoriaLM');
let btnNuevaPalabraAleatoriaLM = document.querySelector('.btnNuevaPalabraAleatoriaLM')
let btnTerminarPalabraAleatoriaLM = document.querySelector('.btnTerminarPalabraAleatoriaLM');
let contenedorPalabraAleatoriaLM = document.querySelector('.palabraAleatoriaLM');
btnMostrarPalabraLM.addEventListener('click',mostrarPalabraAleatoriaLM);
btnNuevaPalabraAleatoriaLM.addEventListener('click',mostrarPalabraAleatoriaLM);
btnTerminarPalabraAleatoriaLM.addEventListener('click', terminarRepasoLM);

function mostrarPalabraAleatoriaLM(){
    let arraySignificante = arrayPalabra.map(arrayPalabra => arrayPalabra.significante)
    let arrayTraduccion = arrayPalabra.map(arrayPalabra => arrayPalabra.traduccion)
    let aleatorio = Math.floor(Math.random() * arrayPalabra.length);
    contenedorPalabraAleatoriaLM.innerHTML=`<div class="contenedorTraduccionLM">${arrayTraduccion[aleatorio]}</div>
    <div class="contenedorSignificanteLM">${arraySignificante[aleatorio]}</div>`;
    $('.contenedorTraduccionLM').fadeIn(1000);
    $('.contenedorSignificanteLM').delay(8000).fadeIn(1000)

    $('.btnNuevaPalabraAleatoriaLM').show()
    $('.btnTerminarPalabraAleatoriaLM').show()
    $('.btnPalabraAleatoriaLM').hide()
}

function terminarRepasoLM(){
    contenedorPalabraAleatoriaLM.innerHTML= '';
    $('.btnTerminarPalabraAleatoriaLM').hide()
    $('.btnNuevaPalabraAleatoriaLM').hide()
    $('.btnPalabraAleatoriaLM').show()
}

//Seleccionar el desubicado
let arrayElegidos = [];
let arrayDesubicado = [];

let btnDesubicado = document.querySelector('.btnDesubicado');
let grilla = document.querySelector('.grilla');

btnDesubicado.addEventListener('click',crearArrayCategoriaAleatoria)

function crearArrayCategoriaAleatoria(){
    let categorizacion = arrayPalabra.map(arrayPalabra => arrayPalabra.categoria);
    let catAleatorio = Math.floor(Math.random() * categorizacion.length);
    let categoriaSorteada = categorizacion[catAleatorio];
    arrayPalabra.forEach((element)=>{
        if(element.categoria === categoriaSorteada){
            arrayElegidos.push(element.significante);
        };
        if(element.categoria !== categoriaSorteada){
            arrayDesubicado.push(element.significante)
        } 
    });
    let posicionAleatoria = Math.floor(Math.random() * arrayDesubicado.length);
    arrayElegidos.push(arrayDesubicado[posicionAleatoria]);
    arrayElegidos.sort();
    crearGrilla();
    //crear un arrray de 10 elementos de los cuales uno es deubicado
}

function crearGrilla(){
    grilla.innerHTML = '';
    arrayElegidos.forEach((element) =>{
        if(arrayDesubicado.includes(element)){
            grilla.innerHTML += `<button class = "tarjeta tarjetaCorrecto" >${element}</button>`;
        }else{
            grilla.innerHTML += `<button class = "tarjeta tarjetaIncorrecto" >${element}</button>`;
        };
    });
    arrayElegidos.sort();
    $('.btnRenovarTarjetas').show()
    $('.btnTerminar').show()
    $('.btnDesubicado').hide()
}

let btnRenovarTarjetas = document.querySelector('.btnRenovarTarjetas');
btnRenovarTarjetas.addEventListener('click', renovarTarjetas)

function renovarTarjetas(){
    arrayElegidos =[];
    arrayDesubicado = [];
    grilla.innerHTML = '';
    crearArrayCategoriaAleatoria();
}

let btnTerminar = document.querySelector('.btnTerminar');
btnTerminar.addEventListener('click', terminarRepaso);

function terminarRepaso(){
    arrayElegidos =[];
    arrayDesubicado = [];
    grilla.innerHTML= '';
    $('.btnRenovarTarjetas').hide()
    $('.btnTerminar').hide()
    $('.btnDesubicado').show()
}

grilla.addEventListener('click', (evt) =>{
    if(evt.target.classList.contains('tarjeta')){
        let bienSeleccionado = document.querySelectorAll('.tarjetaCorrecto')
        let malSeleccionado = document.querySelectorAll('.tarjetaIncorrecto')
        for (let i = 0; i < bienSeleccionado.length; i++) {
            bienSeleccionado[i].addEventListener("click", function() {
                bienSeleccionado[i].classList.add("verde")
           });
        }
        for (let i = 0; i < malSeleccionado.length; i++) {
            malSeleccionado[i].addEventListener("click", function() {
                malSeleccionado[i].classList.add("rojo")
            });
        }
    }
});

//Seccion de importación de JSON
let btnElCLima = document.querySelector('.JSONElClima');
let btnElDormitorio = document.querySelector('.JSONElDormitorio');
let btnLaCasa = document.querySelector('.JSONLaCasa');
let btnLaCocina = document.querySelector('.JSONLaCocina');
let btnLaSala = document.querySelector('.JSONLaSala');
let btnLasBebidas = document.querySelector('.JSONLasBebidas');
let btnLosAnimales = document.querySelector('.JSONLosAnimales');
let btnLosColores = document.querySelector('.JSONLosColores');
let btnLosDeportes = document.querySelector('.JSONLosDeportes');
let divVocImportado = document.querySelector('.vocImportado')
let video = document.querySelector('.videoVocabulum')
let btnLimpiarVocImportado = document.querySelector('.btnLimpiarVocImportado')

const JSONElClima = () =>{
    divVocImportado.innerHTML = '';
    $.getJSON(`json/elClima.json`, (respuesta, estado)=>{
        divVocImportado.innerHTML = `<div class = "limpiarVocImportado"><button class = "btnLimpiarVocImportado">Limpiar</button></div>`;
        if (estado ==="success"){
            respuesta.forEach((element) =>{
                divVocImportado.innerHTML += `<div class='listadoVocImportado'>
                                            <div class='subDivSignificante'><p>${element.significante}</div>
                                            <div class='subDivClase'>${element.clase}</div>
                                            <div class='subDivTraduccion'>${element.traduccion}</div>
                                            <div class='subDivCategoria'>|${element.categoria}</div>
                                        </div>`;
            });
        };
    });
}
const JSONElDormitorio = () =>{
    divVocImportado.innerHTML = '';
    $.getJSON(`json/elDormitorio.json`, (respuesta, estado)=>{
         divVocImportado.innerHTML = `<div class = "limpiarVocImportado"><button class = "btnLimpiarVocImportado">Limpiar</button></div>`;
        if (estado ==="success"){ 
            respuesta.forEach((element) =>{
                divVocImportado.innerHTML += `<div class='listadoVocImportado'>
                                            <div class='subDivSignificante'><p>${element.significante}</div>
                                            <div class='subDivClase'>${element.clase}</div>
                                            <div class='subDivTraduccion'>${element.traduccion}</div>
                                            <div class='subDivCategoria'>|${element.categoria}</div>
                                            
                                        </div>`;
            });
        };
    });
}
const JSONLaCocina = () =>{
    divVocImportado.innerHTML = '';
    $.getJSON(`json/laCocina.json`, (respuesta, estado)=>{
         divVocImportado.innerHTML = `<div class = "limpiarVocImportado"><button class = "btnLimpiarVocImportado">Limpiar</button></div>`;
        if (estado ==="success"){   
            respuesta.forEach((element) =>{
                divVocImportado.innerHTML += `<div class='listadoVocImportado'>
                                            <div class='subDivSignificante'><p>${element.significante}</div>
                                            <div class='subDivClase'>${element.clase}</div>
                                            <div class='subDivTraduccion'>${element.traduccion}</div>
                                            <div class='subDivCategoria'>|${element.categoria}</div>
                                            
                                        </div>`;
            });
        };
    });
}
const JSONLaCasa = () =>{
    divVocImportado.innerHTML = '';
    $.getJSON(`json/laCasa.json`, (respuesta, estado)=>{
         divVocImportado.innerHTML = `<div class = "limpiarVocImportado"><button class = "btnLimpiarVocImportado">Limpiar</button></div>`;
        if (estado ==="success"){
            respuesta.forEach((element) =>{
                divVocImportado.innerHTML += `<div class='listadoVocImportado'>
                                            <div class='subDivSignificante'><p>${element.significante}</div>
                                            <div class='subDivClase'>${element.clase}</div>
                                            <div class='subDivTraduccion'>${element.traduccion}</div>
                                            <div class='subDivCategoria'>|${element.categoria}</div>
                                            
                                        </div>`;
            });
        };
    });
}
const JSONLaSala = () =>{
    divVocImportado.innerHTML = '';
    $.getJSON(`json/laSala.json`, (respuesta, estado)=>{
         divVocImportado.innerHTML = `<div class = "limpiarVocImportado"><button class = "btnLimpiarVocImportado">Limpiar</button></div>`;
        if (estado ==="success"){   
            respuesta.forEach((element) =>{
                divVocImportado.innerHTML += `<div class='listadoVocImportado'>
                                            <div class='subDivSignificante'><p>${element.significante}</div>
                                            <div class='subDivClase'>${element.clase}</div>
                                            <div class='subDivTraduccion'>${element.traduccion}</div>
                                            <div class='subDivCategoria'>|${element.categoria}</div>
                                            
                                        </div>`;
            });
        };
    });
}
const JSONLasBebidas = () =>{
    divVocImportado.innerHTML = '';
    $.getJSON(`json/lasBebidas.json`, (respuesta, estado)=>{
         divVocImportado.innerHTML = `<div class = "limpiarVocImportado"><button class = "btnLimpiarVocImportado">Limpiar</button></div>`;
        if (estado ==="success"){
            respuesta.forEach((element) =>{
                divVocImportado.innerHTML += `<div class='listadoVocImportado'>
                                            <div class='subDivSignificante'><p>${element.significante}</div>
                                            <div class='subDivClase'>${element.clase}</div>
                                            <div class='subDivTraduccion'>${element.traduccion}</div>
                                            <div class='subDivCategoria'>|${element.categoria}</div>
                                            
                                        </div>`;
            });
        };
    });
}
const JSONLosAnimales = () =>{
    divVocImportado.innerHTML = '';
    $.getJSON(`json/losAnimales.json`, (respuesta, estado)=>{
         divVocImportado.innerHTML = `<div class = "limpiarVocImportado"><button class = "btnLimpiarVocImportado">Limpiar</button></div>`;
        if (estado ==="success"){   
            respuesta.forEach((element) =>{
                divVocImportado.innerHTML += `<div class='listadoVocImportado'>
                                            <div class='subDivSignificante'><p>${element.significante}</div>
                                            <div class='subDivClase'>${element.clase}</div>
                                            <div class='subDivTraduccion'>${element.traduccion}</div>
                                            <div class='subDivCategoria'>|${element.categoria}</div>
                                            
                                        </div>`;
            });
        };
    });
}
const JSONLosColores = () =>{
    divVocImportado.innerHTML = '';
    $.getJSON(`json/losColores.json`, (respuesta, estado)=>{
         divVocImportado.innerHTML = `<div class = "limpiarVocImportado"><button class = "btnLimpiarVocImportado">Limpiar</button></div>`;
        if (estado ==="success"){
            respuesta.forEach((element) =>{
                divVocImportado.innerHTML += `<div class='listadoVocImportado'>
                                            <div class='subDivSignificante'><p>${element.significante}</div>
                                            <div class='subDivClase'>${element.clase}</div>
                                            <div class='subDivTraduccion'>${element.traduccion}</div>
                                            <div class='subDivCategoria'>|${element.categoria}</div>           
                                        </div>`;
            });
        };
    });
}
const JSONLosDeportes = () =>{
    divVocImportado.innerHTML = '';
    $.getJSON(`json/losDeportes.json`, (respuesta, estado)=>{
         divVocImportado.innerHTML = `<div class = "limpiarVocImportado"><button class = "btnLimpiarVocImportado">Limpiar</button></div>`;
        if (estado ==="success"){
            respuesta.forEach((element) =>{
                divVocImportado.innerHTML += `<div class='listadoVocImportado'>
                                            <div class='subDivSignificante'><p>${element.significante}</div>
                                            <div class='subDivClase'>${element.clase}</div>
                                            <div class='subDivTraduccion'>${element.traduccion}</div>
                                            <div class='subDivCategoria'>|${element.categoria}</div>
                                        </div>`;
                });
        };
    });
}
const limpiarVocImportado = () =>{
        divVocImportado.innerHTML = `<video class="videoVocabulum" src="./media/videoVocabulum.mp4" autoplay loop muted></video>`;
}

btnElCLima.addEventListener('click', JSONElClima);
btnElDormitorio.addEventListener('click', JSONElDormitorio);
btnLaCasa.addEventListener('click', JSONLaCasa);
btnLaCocina.addEventListener('click', JSONLaCocina);
btnLaSala.addEventListener('click', JSONLaSala);
btnLasBebidas.addEventListener('click', JSONLasBebidas);
btnLosAnimales.addEventListener('click', JSONLosAnimales);
btnLosColores.addEventListener('click', JSONLosColores);
btnLosDeportes.addEventListener('click', JSONLosDeportes);

divVocImportado.addEventListener('click', (evt) =>{
    if(evt.target.classList.contains('btnLimpiarVocImportado')){
        limpiarVocImportado(evt);
    }
})
//Muestra
let btnMuestra = document.querySelector('.btnMuestra');
btnMuestra.addEventListener('click',cargarMuestra);

function cargarMuestra(){
    $.getJSON(`json/muestra.json`, (respuesta, estado)=>{
        if (estado ==="success"){
            respuesta.forEach((element) =>{
                arrayPalabra.push(new nuevaPalabra(element.significante, element.clase, element.traduccion, element.definicion, element.categoria));
                arrayCategoria.push(element.categoria);
            });
            ordenar();
            $('.menu').show(2000);
            $('.btnMuestra').fadeOut(1000);
        };
    })
           
}