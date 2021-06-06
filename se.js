/*
 * This file contains codes related to searchable encryption scheme.
 */
const fs = require('fs');
const crypto = require('crypto');
const assert = require('assert');
const xor = require('buffer-xor');  // do to bitwise xor on two buffers
const {createPreEncryption, createPRNG, createSmallF, createBigF} = require('./utils');

let password = "userChosenPassword"; // later let user choose password
const files = ['sample.txt', 'sample2.txt', 'sample3.txt']; 		    // later let user choose file

// init E, G, f
let E;
let G;
let f;
let F;
const F_iv = crypto.randomBytes(8);


// a helper function
const computeSanity = (arr1, arr2) => {
    if (arr1.length !== arr2.length){
        return false;
    }
    for (let i = 0; i < arr1.length; i++){
        if (arr1[i].length !== arr2[i].length){
            return false;
        }
    }
    return true;
}

// instantiate primitives
const initPrimitives = (password) => {
    E = createPreEncryption(password);
    G = createPRNG(password);
    f = createSmallF(password);
    F = createBigF(F_iv);
    return ;
}

// preEncryption on `files` using primitive E
const computeXis = (files) => {
    const Xi_streams = [];
    const Xis = [];
    files.forEach(filePath => {
            let data = fs.readFileSync(filePath);
            let {Xi_stream, Xi} = E.encrypt(data);
            Xi_streams.push(Xi_stream);
            Xis.push(Xi);
        });
    return {Xi_streams, Xis};
}

const genSis = (Xi_streams) => {
    const Sis = [];
    Xi_streams.forEach( Xi_stream => {
        let si = G.gen(Xi_stream.length / 2);
        Sis.push(si);
    });
    return Sis;
}

const computeKis = (Xis) => {
    const Kis = [];
    Xis.forEach( Xi => {
        let Ki = [];
        for (let block of Xi) {
            let Li = block.slice(0, 8);
            Ki.push(f.encrypt(Li));
        }
        Kis.push(Ki);
    });
    return Kis;
}

const computeFis = (Kis, Sis) => {
    // Kis and Sis should have the same number of elements (they store info about same amount of files)
    // and each number of Kis and Sis should have the same length (each file the same number of blocks)
    assert(computeSanity(Kis, Sis));

    // Fis for all files
    let Fis = [];
    for (let i = 0; i < Sis.length; i++){
        // Fi's for current file
        let Fi = [];
        for (let j = 0; j < Sis[i].length; j++){
            let fi = F.encrypt(Kis[i][j], Sis[i][j]);
            Fi.push(fi);
        }
        Fis.push(Fi);
    }
    return Fis;
}

// Ti is the concat of Si and Fi
const computeTis = (Sis, Fis) => {
    assert(computeSanity(Fis, Sis));

    // Tis for Ti across files
    let Tis = [];
    for (let i = 0; i < Sis.length; i++) {
        // Ti for current file
        let Ti = [];
        for (let j = 0; j < Sis[i].length; j++){
            // ti for the current block
            let ti = Buffer.concat([Sis[i][j], Fis[i][j]]);
            Ti.push(ti);
        }
        Tis.push(Ti);
    }
    return Tis;
}

const computeCis = (Xis, Tis) => {
    assert(computeSanity(Fis, Sis));

    let Cis = [];
    for (let i = 0; i < Xis.length; i++) {
        let Ci = [];
        for (let j = 0; j < Xis[i].length; j++) {
            let ci = xor(Xis[i][j], Tis[i][j]);
            Ci.push(ci);
        }
        Cis.push(Ci);
    }
    return Cis;
}

/*
 * Given a search term in plaintext, compute several terms for query.
 * @requires: `searchTerm` is a string of 16 byte
 * @return:
 */
const computeQueryTerms = (searchTerm) => {
    let W = Buffer.from(searchTerm, 'utf-8');
    // TODO:
    let X = E.encrypt(W).Xi[0];
    let L = X.slice(0, X.length / 2);
    // console.log(`W: ${W};`);
    // console.log(`X:${X}, ${typeof X};`);
    // console.log(`L: ${L}, ${typeof L}`);
    let k = f.encrypt(L);
    return {X, k};
}

/*
 * The search is a sequential scan at server side.
 */
const search = (Cis, X, k) => {
    let toReturn = [];
    for (let Ci of Cis) { // each Ci is an array of 16 byte blocks
        for (let ci of Ci) {
            // console.log(`ci: ${ci}`);
            // p for "potentially be"
            let pTi = xor(ci, X);
            // console.log(`pTi: ${pTi}`);
            let pSi = pTi.slice(0, pTi.length/2);
            // console.log(`pTi: ${pTi}; pSi: ${pSi}`);
            let pFi = F.encrypt(k, pSi);
            if (pFi.compare(pTi.slice(pTi.length/2, pTi.length)) === 0){
                toReturn.push(Ci);
                break;
            }
        }
    }
    return toReturn;
}

initPrimitives(password);
const {Xi_streams, Xis} = computeXis(files);
const Sis = genSis(Xi_streams);
const Kis = computeKis(Xis);
const Fis = computeFis(Kis, Sis);
const Tis = computeTis(Sis, Fis);
const Cis = computeCis(Xis, Tis);

console.log(Xis.map(e => e.length));
console.log(Sis.map(e => e.length));
console.log(Kis.map(e => e.length));
console.log(Fis.map(e => e.length));
console.log(Tis.map(e => e.length));
console.log(Cis.map(e => e.length));
console.log('================Xis');
console.log(Xi_streams);
console.log(Xis);
console.log('================Sis');
console.log(Sis);
console.log('================Kis');
console.log(Kis);
console.log('================Fis');
console.log(Fis);
console.log('================Tis');
console.log(Tis);
console.log('================Cis');
console.log(Cis);

const {X, k} = computeQueryTerms('aaaaaaaaaaaaaaa ');
// console.log(X);
// console.log(k);

const searchRes = search(Cis, X, k);
console.log('================searchRes');
console.log(searchRes);


