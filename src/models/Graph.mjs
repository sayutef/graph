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
            this.#listAdyacencia[this.#map.get(node1)].push(node2, weight);
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
        const D = new Array(this.numVertices()).fill(inf); 
        const visited = new Array(this.numVertices()).fill(false); 
        const startIndex = this.#map.get(startVertex); 
        const endIndex = this.#map.get(endVertex); 
        D[startIndex] = 0; 
    
        let allVisited = false;
    
        while (!allVisited) {
            let u = -1;
            let minDistance = inf;
        
            for (let i = 0; i < this.numVertices(); i++) {
                if (!visited[i] && D[i] < minDistance) {
                    minDistance = D[i];
                    u = i;
                }
            }
    
            if (u === -1) {
                allVisited = true; 
                continue;
            }
    
            visited[u] = true; 
    
            const neighborsLinkedList = this.#listAdyacencia[u];
            if (!neighborsLinkedList) {
                continue;
            }
            let current = neighborsLinkedList.head;
            while (current) {
                const neighbor = this.#map.get(current.value.node); 
                const weight = current.value.weight; 
               
                if (D[u] + weight < D[neighbor]) {
                    D[neighbor] = D[u] + weight;
                }
                current = current.next;
            }
    
            allVisited = true;
            for (let i = 0; i < visited.length; i++) {
                if (!visited[i]) {
                    allVisited = false;
                    break;
                }
            }
        }
    
        return D[endIndex];
    }
    
    

}