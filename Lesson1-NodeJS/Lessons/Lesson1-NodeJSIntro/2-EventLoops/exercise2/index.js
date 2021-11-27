const util1 = require('./utilities/util1.js')
const {lgNum, cut3} = require('./utilities/util2.js')

const numArr = [3,4,5,6];
const wordArr = ['cat','dog','tabbit','bird'];

console.log(util1.sum(numArr));

console.log(util1.concat(numArr, wordArr));

console.log(lgNum(numArr));

console.log(cut3(wordArr));