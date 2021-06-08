// init E, G, f
let E;
let G;
let f;
let F;
const F_iv = crypto.randomBytes(8);

// plain text across all files
// @format: {fileName: fileContent, ...}
let plains = {};
// pre encrypted cipher across all files
// @format: {fileName: preEncryptedContent, ...}
let Xis_stream = {};
// pre encrypted cipher across all files, split in blocks
// @format: {fileName: [arr_of_preEncrypted_blocks], ...}
let Xis = {};

