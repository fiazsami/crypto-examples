const keccak256 = require("keccak256");

class Node {
    constructor(data, pointer) {
        this.data = data;
        this.pointer = pointer;
    }
}

let node1 = new Node("Whelan", null);
console.log(node1);
console.log("===================");

let node2 = new Node("Muhammet", node1);
console.log(node2);
console.log("===================");

let node3 = new Node("Corey", node2);
console.log(node3);
console.log("===================");
