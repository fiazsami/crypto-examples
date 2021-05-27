const net = require("net");
const Web3 = require("web3");
const web3 = new Web3(
    new Web3.providers.IpcProvider(
        "/Users/fiaz/Library/Ethereum/ropsten/geth.ipc",
        net
    )
);

// =========================================================

console.log("ADDRESS 1");
let account1 = web3.eth.accounts.create();
console.log(account1);

console.log("--------------------------------");

console.log("ADDRESS 2");
let account2 = web3.eth.accounts.create();
console.log(account2);

console.log("--------------------------------");

console.log("ADDRESS 3");
let account3 = web3.eth.accounts.privateKeyToAccount(account1.privateKey);
console.log(account3);

console.log("--------------------------------");

let signedMsg = web3.eth.accounts.sign("hello world!", account1.privateKey);

let address1 = account1.address;
console.log(signedMsg);
console.log(address1);
console.log(web3.eth.accounts.recover(signedMsg));

// =========================================================

console.log("DONE");
