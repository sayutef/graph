import Node from "./Node.mjs";
import City from "../City.mjs";

export default class LinkedList {
    #head;
    #count;

    constructor() {
        this.#head = null;
        this.#count = 0;
    }

    push(node, weight = 1) {
        const newNode = new Node({ node, weight });
        if (!this.#head) {
            this.#head = newNode;
        } else {
            let current = this.#head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.#count++;
    }

    isEmpty() {
        return this.#head == null;
    }

    print() {
        let current = this.#head;
        let result = '';
        while (current != null) {
            result += `${current.value.node} (peso: ${current.value.weight}) -> `;
            current = current.next;
        }
        console.log(result);
    }

    get head() {
        return this.#head;
    }


}