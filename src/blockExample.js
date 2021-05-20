const keccak256 = require("keccak256");

function createHash(input) {
    return keccak256(input).toString("hex");
}

class GenesisBlock {
    constructor(genesis) {
        this.data = "GENESIS_BLOCK";
        this.hash = createHash(genesis);
        console.log("===== GENESIS =====");
        console.log(this.hash);
    }
}

class Block {
    constructor(data, block) {
        this.hash = createHash(data + block.hash);
        this.data = data;
        this.pointer = block;
        console.log("===== BLOCK =====");
        console.log(block.hash);
        console.log("--------------");
        console.log(`\t${this.data}`);
        console.log(`\t${this.hash}`);
        console.log();
    }
}

const GENESIS = new GenesisBlock(
    "c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
);

console.log("\n\n");
let block1 = new Block("Whelan" + "dandruff", GENESIS);
let block2 = new Block("Muhammet", block1);
let block3 = new Block("Corey", block2);
