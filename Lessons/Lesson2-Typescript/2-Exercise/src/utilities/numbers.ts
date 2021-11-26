"use strict";
// multiply
const multiply = (num1: number, num2: number): number => {
    return num1 * num2;
};
// add
const sum = (num1: number, num2: number): number =>  {
    return num1 + num2;
};
// divide
const divide = (num1: number, num2: number): number =>  {
    return num1 / num2;
};
// subtract
const subtract = (num1: number, num2: number): number =>  {
    return num1 - num2;
};
// square
const square = (num: number): number =>  {
    return num * num;
};
module.exports = {
    multiply: multiply,
    subtract: subtract,
    divide: divide,
    sum: sum,
    square: square
};
