const NodeRSA = require("node-rsa");

const privateKey1 = new NodeRSA({ b: 512 });
let encryptedMsg1 = privateKey1.encrypt("this is the first message", "base64");
console.log(encryptedMsg1);
console.log(privateKey1.decrypt(encryptedMsg1, "utf8"));

console.log("================================");

const privateKey2 = new NodeRSA({ b: 512 });
let encryptedMsg2 = privateKey2.encrypt("this is the second message", "base64");
console.log(encryptedMsg2);
console.log(privateKey2.decrypt(encryptedMsg2, "utf8"));

console.log("================================");

console.log(privateKey1.decrypt(encryptedMsg2, "utf8"));
