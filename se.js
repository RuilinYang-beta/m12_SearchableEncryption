// // comment them when run in Electron, they will be imported in globalModules.js
// const fs = require('fs');
// const crypto = require('crypto');
// const assert = require('assert');
// const xor = require('buffer-xor');  // do to bitwise xor on two buffers
// const {createPreEnc, createFilenameEnc, createPRNGs, createSmallF, createBigF} = require('./primitives');
// let E;   // pre encryption
// let e;   // encrypt filename
// let Gs;  // PRNG for all the files {fileName: PRNG_of_the_file, ...}
// let f;   // compute k_i for each block
// let F;   // compute the block to XOR with R_i
// let password = "userChosenPassword"; // later let user choose password
// const fileNames = ['./sampleFiles/sample.txt', './sampleFiles/sample2.txt', './sampleFiles/sample3.txt'];


/**
 * This file contains codes related to searchable encryption scheme.
 * Naming convention:
 * - Wi:
 *      the words of a file [word1, word2, ...] where each word is a block
 * - Wjs:
 *      the words across all files: {file1: [words_of_file1], ...}
 */

// return true if `obj1` and `obj2` have same #entries
// and each entry has same #blocks
const checkSanity = (obj1, obj2) => {
    if (Object.keys(obj1).length !== Object.keys(obj2).length){
        return false;
    }
    for (let fn in obj1) {
        assert(obj2[fn] !== undefined);
        if (obj1[fn].length !== obj2[fn].length) {
            return false;
        }
    }
    return true;
}

// instantiate primitives
const initPrimitives = (password, fileNames) => {
    E = createPreEnc(password);
    e = createFilenameEnc(password);
    Gs = createPRNGs(password, fileNames);
    f = createSmallF(password);
    F = createBigF();
    return ;
}

/**
 * Output plain text split in blocks.
 * @param plains: {filename: stringOfContent, ..}
 * @return Wjs: {filename: [arr_of_block_buffer], ..}
 */
const computeWjs = (plains) => {
    let Wjs = {};
    for (let fn in plains) {
        let bufBig = Buffer.from(plains[fn]);
        let Wj = [];
        let start = 0;
        while (start + 16 <= bufBig.length){
            Wj.push(bufBig.slice(start, start + 16));
            start += 16;
        }
        if (start < bufBig.length) {
            Wj.push(bufBig.slice(start, bufBig.length));
        }
        Wjs[fn] = Wj;
    }
    return Wjs;
}

/**
 * preEncryption on `files` using primitive E
 * @param plains: {fileName: fileContentString, ...}
 * @returns Xjs_stream: {filename: bigBuffer,..}
 *          Xjs: {filename: [arr_of_block_buffer]}
 */
const computeXjs = (plains) => {
    // -- use in electron  @plains: {filename: fileContentString}
    let Xjs_stream = {};
    let Xjs = {};

    // fn for file name
    for (let fn in plains) {
        let {Xj_stream, Xj} = E.encrypt(plains[fn])
        Xjs_stream[fn] = Xj_stream;
        Xjs[fn] = Xj;
    }
    return {Xjs_stream, Xjs};

    // -- use for local test; @plains: [filenames]
    // const Xjs = {};
    // plains.forEach(filePath => {
    //         let data = fs.readFileSync(filePath);
    //         let {Xj_stream, Xj} = E.encrypt(data);
    //         Xjs[filePath] = Xj;
    //     });
    // return Xjs;
}

// populate Ljs and Rjs as views of Xjs
const computeLjsRjs = (Xjs) => {
    let Ljs = {};
    let Rjs = {};
    for (let fn in Xjs) {
        let Lj = [];
        let Rj = [];
        for (let block of Xjs[fn]) {
            Lj.push(block.slice(0, 8));
            Rj.push(block.slice(8, 16));
        }
        Ljs[fn] = Lj;
        Rjs[fn] = Rj;
    }
    return {Ljs, Rjs};
}

// now Xi_streams is an array of big buffers
// needs to turn it into an obj of {name: buffer}
const genSis = (Gs, Ljs) => {
    let Sis = {};
    for (let fn in Ljs) {
        // the PRNG of this file
        let G = Gs[fn];
        let Si = G.gen(Ljs[fn].length);
        Sis[fn] = Si;
    }
    return Sis;
}

const computeKjs = (Ljs) => {
    let Kjs = {};
    for (let fn in Ljs) {
        let Kj = [];
        for (let block of Ljs[fn]) {
            Kj.push(f.encrypt(block));
        }
        Kjs[fn] = Kj;
    }
    return Kjs;
}

const computeFjs = (kjs, Sjs) => {
    assert(checkSanity(kjs, Sjs));

    let Fjs = {};
    for (let fn in kjs) {
        let Fj = [];
        for (let i = 0; i < kjs[fn].length; i++){
            Fj.push(F.encrypt(kjs[fn][i], Sjs[fn][i]));
        }
        Fjs[fn] = Fj;
    }
    return Fjs;
}

// Tj is the concat of Sj and Fj
const computeTjs = (Sjs, Fjs) => {
    assert(checkSanity(Fjs, Sjs));
    let Tjs = {};
    for (let fn in Sjs) {
        let Tj = [];
        for (let i = 0; i < Sjs[fn].length; i++){
            Tj.push(Buffer.concat([Sjs[fn][i], Fjs[fn][i]]));
        }
        Tjs[fn] = Tj;
    }
    return Tjs;
}

const computeCjs = (Xjs, Tjs) => {
    assert(checkSanity(Xjs, Tjs));

    let Cjs = {};
    for (let fn in Xjs) {
        let Cj = [];
        for (let i = 0; i < Xjs[fn].length; i++){
            Cj.push(xor(Xjs[fn][i], Tjs[fn][i]));
        }
        Cjs[fn] = Cj;
    }
    return Cjs;
}

/*
 * Given a search term in plaintext, compute several terms for query.
 * @requires: `searchTerm` is a string of 16 byte
 * @return:
 */
const computeQueryTerms = (searchTerm) => {
    let W = Buffer.from(searchTerm, 'utf-8');
    // for now, the search term must be 16 byte,
    // and it should be a clear cut of a block
    assert(W.length === 16);

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
    // each Ci is cipher text of a document, an array of 16 byte blocks
    for (let Ci of Cis) {
        // each ci is a block of the cipher text
        for (let ci of Ci) {
            // console.log(`ci: ${ci}`);
            // p for "potentially be"
            let pTi = xor(ci, X);
            // console.log(`pTi: ${pTi}`);
            let pSi = pTi.slice(0, pTi.length / 2);
            // console.log(`pTi: ${pTi}; pSi: ${pSi}`);
            // the init vector of F should be shared between client and server
            let pFi = F.encrypt(k, pSi);
            if (pFi.compare(pTi.slice(pTi.length/2, pTi.length)) === 0){
                toReturn.push(Ci);
                break;
            }
        }
    }
    return toReturn;
}



// // sample usage
// initPrimitives(password, fileNames);
// console.log(f.encrypt(Buffer.from('aaaaaaa ')));

// console.log(computeKjs({'file1': [Buffer.from('aaaaaaa ')]}));
// const Xjs = computeXjs(fileNames);
// const {Ljs, Rjs} = computeLjsRjs(Xjs);
// const kjs = computeKjs(Ljs);
//
// console.log('------ Xjs ');
// console.log(Xjs);
// console.log('------ Ljs ');
// console.log(Ljs);
// console.log('------ Rjs ');
// console.log(Rjs);
// console.log('------ kjs ');
// console.log(kjs);

// const {X, k} = computeQueryTerms('aaaaaaaaaaaaaaa ');
// // console.log(X);
// // console.log(k);
//
// const searchRes = search(Cis, X, k);
// console.log('================searchRes');
// console.log(searchRes);


// module.exports = {initPrimitives};
//
// initPrimitives('password');
// const {Xis_stream, Xis} = computeXjs({'file1':'this is contenet 1 and its content is long', 'file2': 'content2'});
// console.log(`you are here ${Xis_stream}`);
// // console.log(Xis_stream);
// console.log(Xis['file1']);
//
// // to display them with visual block boundary aid
// let toShow = '';
// Xis['file1'].forEach( e => {
//     toShow += '[';
//     toShow += e.toString('hex');
//     toShow += '], ';
// })
//
// console.log(toShow);