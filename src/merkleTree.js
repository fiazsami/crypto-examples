const keccak256 = require("keccak256");

function createHash(input) {
    return keccak256(input).toString("hex");
}

class Tx {
    constructor(data) {
        this.hash = createHash(data);
        this.data = data;
    }
}

class Node {
    constructor(left, right) {
        this.hash = createHash(left.hash + right.hash);
        this.left = left;
        this.right = right;
    }
}

let transaction1 = new Tx("transaction1");
let transaction2 = new Tx("transaction2");
let node3 = new Node(transaction1, transaction2);

let transaction3 = new Tx("transaction3");
let transaction4 = new Tx("transaction4");
let node4 = new Node(transaction3, transaction4);

let transaction5 = new Tx("transaction5");
let transaction6 = new Tx("transaction6");
let node5 = new Node(transaction5, transaction6);

let transaction7 = new Tx("transaction7");
let transaction8 = new Tx("transaction8");
let node6 = new Node(transaction7, transaction8);

let node1 = new Node(node3, node4);
let node2 = new Node(node5, node6);

let root = new Node(node1, node2);

console.log(root.hash);

function merkleProof(node1, node2, transaction1, transaction2) {
    let hash4 = createHash(transaction1.hash + transaction2.hash);
    let hash1 = createHash(node1.hash + hash4);
    return createHash(hash1 + node2.hash);
}

let hack = new Tx("hack");
let proof = merkleProof(node3, node2, transaction3, transaction4);

console.log(proof);
