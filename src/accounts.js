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

function generatePrivateKey(mnemonic, dPath) {
    const seed = generateSeed(mnemonic);
    return hdkey
        .fromMasterSeed(seed)
        .derivePath(dPath)
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

const MNEMONIC = BIP39.generateMnemonic();
for (let i = 0; i < 50; i++) {
    const dPath = getDerivationPath(0, i);
    const privateKey = generatePrivateKey(MNEMONIC, dPath);
    const publicKey = derivePublicKey(privateKey);
    const address = deriveEthAddress(publicKey);
    // console.log(dPath);
    // console.log(privateKey.toString("hex"));
    // console.log(publicKey.toString("hex"));
    console.log(address);
    // console.log();
}

console.log(MNEMONIC);
