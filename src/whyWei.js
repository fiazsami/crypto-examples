function square(x) {
    // return x * x;
    return x ** 2;
}

// 1 eth == 10 ** 18 wei
// 2 eth == 2 * (10 ** 18) wei

function toWei(eth) {
    return eth * 10 ** 18;
}

function toEth(wei) {
    return wei / 10 ** 18;
}

let amountEth = 2.9;
let amountWei = toWei(amountEth);

console.log(`WEI: ${amountWei}`);

let weiToEth = toEth(amountWei);

console.log(`WEI to ETH: ${weiToEth}`);

let number1 = 5 / 3;
let number2 = number1 * 3;
console.log(number2);
