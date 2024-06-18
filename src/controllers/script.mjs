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

    if(!city || !distancia){
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
    const nodoOrigenCamino = document.getElementById('origen-dij').value.trim();
    const nodoDestinoCamino = document.getElementById('destino').value.trim();

    if (nodoOrigenCamino === '' || nodoDestinoCamino === '') {
        Swal.fire("Debes ingresar nodos válidos para calcular el camino más corto.");
        return;
    }

    const shortestDistance = graph.dijkstra(nodoOrigenCamino, nodoDestinoCamino);

    if (shortestDistance === 1000000) {
        Swal.fire(`No se encontró camino entre "${nodoOrigenCamino}" y "${nodoDestinoCamino}"`);
    } else {
       
        Swal.fire(`El camino más corto entre "${nodoOrigenCamino}" y "${nodoDestinoCamino}" es ${shortestDistance}`);
        }
});







