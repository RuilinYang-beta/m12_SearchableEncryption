/**
 * This file contains global variables and functions that can be accessed across pages.
 */

// init E, Gs, f
let E;   // pre encryption
let e;   // encrypt filename
let Gs;  // PRNG for all the files {fileName: PRNG_of_the_file, ...}
let f;   // compute k_i for each block
let F;   // compute the block to XOR with R_i

let _dummy = 'aaaaaaaaaaaaaaa ';
let _print = (Xjs, displayVarName) => {
    // log variable name
    console.log(`---------- ${displayVarName} ----------`);

    // log variable values
    for (let fn in Xjs) {
        console.log(`${fn}: \n${Xjs[fn].map(e => "    " + e.toString('hex')).join('\n')}`);
    }
}

const isTrue = (e) => e;

let displayBlocks = (blocksArr, encoding='hex') => {
    let toDisplay = '';
    for (let block of blocksArr){
        toDisplay += `[${block.toString(encoding)}],`;
    }
    return toDisplay;
}

// --- populated in page 1 ---
// @format: {fileName: fileContent, ...}
let plains = {};
// @format: {fileName: [arr_of_blocks], ...}
let Wjs = {}
// @format: {fileName: preEncryptedContent, ...}
let Xjs_stream = {};   // TODO: can I remove this?
let Xjs = {};
// --- populated in page 2 ---
let Ljs = {};
let Rjs = {};
let kjs = {};
let Sjs = {};
let Fjs = {};
let Tjs = {};
let Cjs = {};
let fnEncs = {};  // encrypted filename
// --- populated in page 3 ---
// `b` for "Bob"; `comp` for "computed; `act` for "actual
let bSjs = {};
let bFjs = {};
let bFjs_comp = {};
let isEqual = {};
// --- populated in page 4 ---
let SjsDec = {};
let LjsDec = {};
let kjsDec = {};
let FjsDec = {};
let RjsDec = {};
let WjsDec = {};