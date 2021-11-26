"use strict";
const concat = (str1: string, str2: string): string => {
    return str1 + str2;
};
const capitalize = (str: string): string => {
    var newStr = str.split(' ')
        .map(function (word) { return word[0].toUpperCase() + word.substr(1); })
        .join(' ');
    return newStr;
};
const upperCase = (str: string): string => {
    return str.toUpperCase();
};
const lowerCase = (str: string): string => {
    return str.toLowerCase();
};
module.exports = {
    concat: concat,
    capitalize: capitalize,
    upperCase: upperCase,
    lowerCase: lowerCase
};
