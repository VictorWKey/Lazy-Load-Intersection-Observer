const publicaciones = document.querySelector(".publicaciones");
let contador = 0;

const createPublicationCode = (name, content)=>{
    const container = document.createElement("DIV");
    const comentarios = document.createElement("DIV");
    const nombre = document.createElement("H3");
    const contenido = document.createElement("P");
    const btnComentario = document.createElement("INPUT");
    const btnEnviar = document.createElement("INPUT");

    container.classList.add("publicacion");
    comentarios.classList.add("comentarios");
    btnEnviar.classList.add("enviar");
    btnComentario.classList.add("comentario");

    btnComentario.setAttribute("placeholder", "Introduce un comentario");
    nombre.textContent = name;
    contenido.textContent = content;

    btnEnviar.setAttribute("type", "submit");

    comentarios.appendChild(btnComentario);
    comentarios.appendChild(btnEnviar);

    container.appendChild(nombre);
    container.appendChild(contenido);
    container.appendChild(comentarios);

    return container;
}

const cargarMasPublis = entries =>{
    entries.map(element =>{
        if(element.isIntersecting) {
            cargarPublicaciones(4);
            console.log(entries);
        }
    })

}

const observer = new IntersectionObserver(cargarMasPublis);



const cargarPublicaciones = async num => {
    const request = await fetch("info.txt");
    const content= await request.json();
    const arr = content.content;
    const documentFragment = document.createDocumentFragment();
    for(let i = 0; i < num; i++){
        if(arr[contador] != undefined){
            const newPublicacion = createPublicationCode(arr[contador].nombre, arr[contador].contenido);
            documentFragment.appendChild(newPublicacion);
            contador++
            if (i == num-1) observer.observe(newPublicacion);
        } else {
            if(publicaciones.lastElementChild.id != "nomore"){
                let noMore = document.createElement("h3");
                noMore.id = "nomore";
                noMore.textContent = "No hay mas publicaciones";
                documentFragment.appendChild(noMore);
                publicaciones.appendChild(documentFragment);
                break; //Esto hara que el ciclo quiebre en la primera vuelta y no de las 4 y ponga 4 veces el h3
            }

        }

    }
    publicaciones.appendChild(documentFragment);
}

cargarPublicaciones(4);




