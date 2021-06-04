const BIP39 = require("bip39");
const hdkey = require("ethereumjs-wallet/hdkey");
const Wallet = require("ethereumjs-wallet");
const EthereumTx = require("ethereumjs-tx");

const keccak256 = require("keccak256");

function generateSeed(mnemonic) {
    return BIP39.mnemonicToSeed(mnemonic);
}

// m / purpose' / coin_type' / account' / change / address_index

function getDerivationPath(account, index) {
    return `m/44'/60'/${account}'/0'/${index}`;
}

function generatePrivateKey(mnemonic, derivationPath) {
    const seed = generateSeed(mnemonic);
    return hdkey
        .fromMasterSeed(seed)
        .derivePath(derivationPath)
        .getWallet()
        .getPrivateKey();
}

function derivePublicKey(privateKey) {
    const wallet = Wallet.fromPrivateKey(privateKey);
    return wallet.getPublicKey();
}

function deriveEthAddress(publicKey) {
    const pkh = keccak256(publicKey).toString("hex");
    const pkh40 = pkh.substring(pkh.length - 40, pkh.length);
    return `0x${pkh40}`;
}

class MyWallet {
    constructor(mnemonic, count = 1) {
        this.mnemonic = mnemonic;
        this.paths = [];
        for (let i = 0; i < count; i++) {
            const path = getDerivationPath(0, i);
            const privateKey = generatePrivateKey(this.mnemonic, path);
            const publicKey = derivePublicKey(privateKey);
            const address = deriveEthAddress(publicKey);
            this.paths.push({
                path: path,
                private: privateKey,
                public: publicKey,
                address: address,
            });
        }
    }

    signTx(txData, path = 0) {
        const tx = new EthereumTx(txData);
        tx.sign(this.paths[path].private);
        return tx;
    }
}

module.exports = MyWallet;
