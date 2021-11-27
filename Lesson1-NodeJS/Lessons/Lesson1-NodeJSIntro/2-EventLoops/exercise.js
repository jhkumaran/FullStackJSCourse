const fs = require('fs');

setTimeout(() => {
    console.log('Print Fifth');
}, 1000);


setTimeout(() => {
    console.log('Print Third');
}, 0);

process.nextTick(() => {
    console.log('Print Second');
})

console.log('Print First');

fs.readFile(__filename, () => {
    console.log('Print Fourth');
})
