const sha256 = require("sha256");

var startTime, endTime;

function start() {
    startTime = new Date();
}

function end() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds
    var seconds = Math.round(timeDiff);
    console.log(seconds + " seconds");
}

function mineBlock(transactionRoot, previousBlockHash, difficulty, nonce) {
    let block = {
        txRoot: transactionRoot,
        previousBlockHash: previousBlockHash,
        nonce: nonce,
    };

    let blockHash = sha256(JSON.stringify(block));

    if (blockHash.startsWith("0")) {
        console.log(`nonce#${nonce}: ${blockHash}`);
    }

    if (!blockHash.startsWith("0".repeat(difficulty))) {
        mineBlock(transactionRoot, previousBlockHash, difficulty, nonce + 1);
    }
}

function mineBlockIter(transactionRoot, previousBlockHash, difficulty, nonce) {
    start();
    let blockHash = sha256(
        JSON.stringify({
            txRoot: transactionRoot,
            previousBlockHash: previousBlockHash,
            nonce: nonce,
        })
    );

    while (!blockHash.startsWith("0".repeat(difficulty))) {
        blockHash = sha256(
            JSON.stringify({
                txRoot: transactionRoot,
                previousBlockHash: blockHash,
                nonce: nonce + 1,
            })
        );
    }
    if (blockHash.startsWith("0")) {
        console.log(blockHash);
    }
    end();
}

const GENESIS_BLOCK = {
    timestamp: 1621864835738,
    difficulty: 5,
    networkID: 1337,
};

const GENESIS_TX = sha256(JSON.stringify(GENESIS_BLOCK));
mineBlockIter(GENESIS_TX, GENESIS_TX, 7, 0);
