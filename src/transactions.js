const BIP39 = require("bip39");
const MyWallet = require("./wallets");

// const mnemonic = BIP39.generateMnemonic();
const mnemonic =
    "member swap color spy wage three sunny daring depart broken tower unique";
// console.log(mnemonic);
const wallet = new MyWallet(mnemonic, 10);

const tx = wallet.signTx("hello world", 1);

console.log("0x" + tx.getSenderAddress().toString("hex"));
console.log(wallet.paths[1].address.toString("hex"));
