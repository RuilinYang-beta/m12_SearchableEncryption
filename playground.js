const crypto = require('crypto');
const fs = require('fs');

// crypto.getCiphers().forEach( e => console.log(e));


// fs.readFile('sample.txt', (err, data) => {
//     if (err) reject(`Error in encDecFile: ${err}`);
//
//     console.log(data.length);
// });


// var xor = require('buffer-xor')
// var a = new Buffer('aaaaaaaaaaaaaaa', 'hex')
// var b = new Buffer('f0f0', 'hex')
//
// console.log(xor(a, b))


const buf1 = Buffer.from('0123');
const buf2 = Buffer.from('1234');
console.log(buf1.compare(buf2));