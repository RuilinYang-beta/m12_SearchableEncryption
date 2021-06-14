const crypto = require('crypto');
const fs = require('fs');
const assert = require('assert');

// --- about xor ---
// var xor = require('buffer-xor')
// var a = new Buffer('aaaaaaaaaaaaaaa', 'hex')
// var b = new Buffer('f0f0', 'hex')
//
// console.log(xor(a, b))

// --- enc filename ---
// const filename = 'this is filename';
// const total_len = 256;
//
// const filenameBuf = Buffer.from(filename);
// const left = Math.floor((256 - filenameBuf.length) / 2);
// const right = total_len - left - filenameBuf.length;
//
// const leftBuf = Buffer.alloc(left, ' ');
// const rightBuf = Buffer.alloc(right, ' ');
//
// console.log(Buffer.concat([leftBuf, filenameBuf, rightBuf]).toString());

// let userChosenPassword = 'something';
// // key: 64 bits; block: 64 bits;
// const algo = 'bf-cbc';
// // salt is computed from algo and password
// const hash = crypto.createHash('sha256');
// const salt = hash.update(`${algo}${userChosenPassword}`).digest();
// // key is computed from password and salt
// const key = crypto.scryptSync(userChosenPassword, salt, 8);
// // iv is the last 64 bits of salt
// const iv = salt.slice(salt.length - 8, salt.length);
//
// const encrypt = (dataBuf) => {
//     assert(dataBuf.length === 8);
//     const cipher = crypto.createCipheriv(algo, key, iv);
//     // disable padding, because we make sure to feed it the correct length (64 bits)
//     cipher.setAutoPadding(false);
//     const encrypted = cipher.update(dataBuf);
//     return Buffer.concat([encrypted, cipher.final()]);
// };
//
// console.log(encrypt(Buffer.from('aaaaaaa ')));

crypto.getCiphers().forEach(e => console.log(e));