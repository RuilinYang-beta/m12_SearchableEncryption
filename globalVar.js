/**
 * This file contains global variables that the renderer pages can access.
 */

// init E, Gs, f
let E;   // pre encryption
let e;   // encrypt filename
let Gs;  // PRNG for all the files {fileName: PRNG_of_the_file, ...}
let f;   // compute k_i for each block
let F;   // compute the block to XOR with R_i

let displayBlocks = (blocksArr) => {
    let toDisplay = '';
    for (let block of blocksArr){
        toDisplay += `[${block.toString('hex')}],`;
    }
    return toDisplay;
}

// @format: {fileName: fileContent, ...}
let plains = {};
// @format: {fileName: [arr_of_blocks], ...}
let Wjs = {}
// @format: {fileName: preEncryptedContent, ...}
let Xjs_stream = {};   // TODO: can I remove this?
// @format: {fileName: [arr_of_preEncrypted_blocks], ...}
let Xjs = {};
let Ljs = {};
let Rjs = {};
let kjs = {};
let Sjs = {};
let Fjs = {};
let Tjs = {};
let Cjs = {};



