/**
 * This file contains global variables that the renderer pages can access.
 */

// init E, Gs, f
let E;   // pre encryption
let e;   // encrypt filename
let Gs;  // PRNG for all the files {fileName: PRNG_of_the_file, ...}
let f;   // compute k_i for each block
let F;   // compute the block to XOR with R_i

// use the same iv across all the PRNGs
// const G_iv = crypto.randomBytes(16);
// const F_iv = crypto.randomBytes(8);

// plain text across all files
// @format: {fileName: fileContent, ...}
let plains = {};
// pre encrypted cipher across all files
// @format: {fileName: preEncryptedContent, ...}
let Xis_stream = {};
// pre encrypted cipher across all files, split in blocks
// @format: {fileName: [arr_of_preEncrypted_blocks], ...}
let Xis = {};



