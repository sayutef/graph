import LinkedList from "./LinkedList.mjs";

export default class Graph {
    #listAdyacencia = [];
    #map = new Map();

    constructor() {}


    getMap(){
        return this.#map;
    }
    addVertices(vertex) {
        if (!this.#map.has(vertex)) {
            this.#listAdyacencia.push(new LinkedList());
            this.#map.set(vertex, this.#listAdyacencia.length - 1);
        }
    }

    addEdge(node1, node2, weight = 1) {
        if (this.#map.has(node1) && this.#map.has(node2)) {
            this.#listAdyacencia[this.#map.get(node1)].push( node2, weight);
            return true;
        }
        return false;
    }

    dfs(startVertex, callback) {
        if (!this.#map.has(startVertex)) {
            return;
        }
    
        const visited = {};
        const stack = [];
        stack.push(startVertex);
    
        while (stack.length > 0) {
            const currentVertex = stack.pop();
            if (!visited[currentVertex]) {
                callback(currentVertex);
                visited[currentVertex] = true;
                const neighborsLinkedList = this.#listAdyacencia[this.#map.get(currentVertex)];
                let current = neighborsLinkedList.head;
                while (current) {
                    const neighborVertex = current.value.node;
                    if (!visited[neighborVertex]) {
                        stack.push(neighborVertex);
                    }
                    current = current.next;
                }
            }
        }
    }
    
    bfs(startVertex, callback) {
        if (!this.#map.has(startVertex)) {
            return;
        }
    
        const visited = {};
        const queue = [];
        queue.push(startVertex);
    
        while (queue.length > 0) {
            const currentVertex = queue.shift();
            if (!visited[currentVertex]) {
                callback(currentVertex);
                visited[currentVertex] = true;
                const neighborsLinkedList = this.#listAdyacencia[this.#map.get(currentVertex)];
                let current = neighborsLinkedList.head;
                while (current !== null) {
                    const neighborVertex = current.value.node;
                    if (!visited[neighborVertex]) {
                        queue.push(neighborVertex);
                    }
                    current = current.next;
                }
            }
        }
    }
    

    
    printGraph(callback) {
        for (let [vertex, index] of this.#map.entries()) {
            const linkedList = this.#listAdyacencia[index];
            const neighbors = linkedList.toList(); 
            callback(vertex, neighbors);
        }
    }


    getVertices() {
        return this.#map.keys();
    }

    getNeighbors(vertex) {
        const index = this.#map.get(vertex);
        if (index !== undefined) {
            return this.#listAdyacencia[index];
        }
        return null; 
    }

    numVertices() {
        return this.#map.size;
    }

    dijkstra(startVertex, endVertex) {
        const inf = 1000000;
        const numVertices = this.numVertices();
        let D = [];   
        let L_p = [];
        let L = []; 
        let V = [];   
        
        for (let i = 0; i < numVertices; i++) {
            D.push(inf);   
            L_p.push(i);    
            V.push(i);     
        }
        
        const start = this.#map.get(startVertex);
        const end = this.#map.get(endVertex);
        
        if (start === undefined || end === undefined) {
            return Infinity; 
        }
    
        D[start] = 0;
        
        console.log('Inicialización:');
        console.log('D:', D);
        console.log('L_p:', L_p);
        console.log('L:', L);
        console.log('V:', V);
        console.log('------------------');
        
        while (L_p.length != 0) {
            let u = null;
            let minDistance = inf;
        
            for (let i = 0; i < L_p.length; i++) {
                if (D[L_p[i]] < minDistance) {
                    minDistance = D[L_p[i]];
                    u = L_p[i];
                }
            }
        
            if (u === null) {
                break;
            }
        
            L.push(u);
            L_p = L_p.filter(vertex => vertex !== u);
        
            const neighborsLinkedList = this.#listAdyacencia[u];
            let current = neighborsLinkedList.head; 
        
            while (current) {
                const neighbor = this.#map.get(current.value.node);
                const weight = current.value.weight;
        
                if (L_p.includes(neighbor) && D[u] + weight < D[neighbor]) {
                    D[neighbor] = D[u] + weight;
                }
                current = current.next;
            }
        
            console.log('Iteración:');
            console.log('u:', u);
            console.log('D:', D);
            console.log('L_p:', L_p);
            console.log('L:', L);
            console.log('V:', V);
            console.log('------------------');
        }
        
        return D[end];
    }
    
}    