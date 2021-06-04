const BIP39 = require("bip39");
const hdkey = require("ethereumjs-wallet/hdkey");
const Wallet = require("ethereumjs-wallet");

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

function generateWallet(count = 1) {
    let wallet = {
        mnemonic: BIP39.generateMnemonic(),
        paths: [],
    };
    for (let i = 0; i < count; i++) {
        const path = getDerivationPath(0, i);
        const privateKey = generatePrivateKey(wallet.mnemonic, path);
        const publicKey = derivePublicKey(privateKey);
        const address = deriveEthAddress(publicKey);
        wallet.paths.push({
            path: path,
            private: privateKey.toString("hex"),
            public: publicKey.toString("hex"),
            address: address,
        });
    }
    return wallet;
}

console.log(generateWallet());
