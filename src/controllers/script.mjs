import City from "../City.mjs";
import Graph from "../models/Graph.mjs";
import { linkedList } from "./dependencies.mjs";


let add = document.getElementById("add-btn");
let addConexion = document.getElementById("addEdge-btn");
let deepTour = document.getElementById("recorrido-btn");
let widthRun = document.getElementById("recorridoAnchura-btn");
let minimalDistance = document.getElementById("distanceMin-btn");

let graph = new Graph();


add.addEventListener("click", () =>{
    let city = document.getElementById("city").value;
    let distancia = document.getElementById("addDistance").value;

    if(!city){
        Swal.fire("Por favor, completa todos los campos.");
        return;
    }

    graph.addVertices(city, distancia); 
    Swal.fire("Registro exitoso");
});

addConexion.addEventListener("click", ()=>{
    let nodeInitial = document.getElementById("origen").value;
    let distance = document.getElementById("distance").value;
    let nodeFinal = document.getElementById("destino").value;

    if(!nodeInitial || !distance || !nodeFinal){
        Swal.fire("Por favor, completa todos los campos.");
        return;
    }
    
    graph.addEdge(nodeInitial, nodeFinal, distance )
        
    Swal.fire(`La distancia entre ${nodeInitial} y ${nodeFinal} se agregó correctamente`);
});

deepTour.addEventListener("click", ()=>{
    let imprimir3 = document.getElementById("imprimirAll")
    imprimir3.innerHTML = ''; 

    if (graph.numVertices() === 0) {
        Swal.fire("Agrega una ciudad");
        return;
    }

    const startVertex = [...graph.getVertices()][0]
    graph.dfs(startVertex, (vertex) => {
        imprimir3.innerHTML += `${vertex} `;
    });

    Swal.fire("Recorrido completado");
});


widthRun.addEventListener("click", ()=>{
    if (graph.numVertices() === 0) {
        Swal.fire("Agrega una ciudad");
        return;
    }

    const startVertex = [...graph.getVertices()][0];
    let result = document.getElementById("imprimirAll");
    result.innerHTML = '';

    graph.bfs(startVertex, (vertex) => {
        result.innerHTML += `${vertex} `;
    });

    Swal.fire("Recorrido completado");
});

minimalDistance.addEventListener("click", ()=>{
    let origenDij = document.getElementById('origen-dij').value.trim();
    let destinoDij = document.getElementById('destino-dij').value.trim();

    if (origenDij === '' || destinoDij === '') {
        Swal.fire("Debes ingresar nodos válidos para calcular el camino más corto.");
        return;
    }

    let shortestDistance = graph.dijkstra(origenDij, destinoDij);

    if (shortestDistance === Infinity) {
        Swal.fire(`No se encontró camino entre "${origenDij}" y "${destinoDij}"`);
    } else {
        Swal.fire(`La distancia más corta entre "${origenDij}" y "${destinoDij}" es ${shortestDistance}`);
    }
});







