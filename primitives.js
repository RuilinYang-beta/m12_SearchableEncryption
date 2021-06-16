// // comment them when run in Electron, they will be imported in globalModules.js
// const crypto = require('crypto');
// const fs = require('fs');
// const assert = require('assert');

/**
 * User only need to remember the `userChosenPassword`, everything else (ie. iv, salt, key) can be
 * derived from it. So even if user lose the handle to the primitives E, Gs, f, F (eg. quit and restart the session),
 * they can still be constructed by feeding `userChosenPassword` to the functions in this module.
 */

// ========================================================================
// ............... 1. pre-encryption built with aes-128-ecb ...............
// ========================================================================
/**
 * Use userChosenPassword to derive salt and key, then construct a pre-encryption cipher.
 * @return: an obj of two functions and a key:
 *          - func encrypt:
 *              take the data buffer to encrypt and return the encrypted in two formats(stream / block-sized)
 *          - func decrypt:
 *              take the data buffer to decrypt and return the decrypted
 *          - key:
 *              a computationally-expensive derived key
 */
const createPreEnc = (userChosenPassword) => {
    // key: 128 bits; block: 128 bits;
    const algo = 'aes-128-ecb';
    // salt is computed from algo and password
    const hash = crypto.createHash('sha256');
    const salt = hash.update(`${algo}${userChosenPassword}`).digest();
    // key is derived securely
    const key = crypto.scryptSync(userChosenPassword, salt, 16);

    // dataBuf is the content of a whole file
    const encrypt = (dataBuf, padding=true) => {
        const cipher = crypto.createCipheriv(algo, key, '');  // ecb mode doesn't have an iv
        cipher.setAutoPadding(padding);
        const encrypted = cipher.update(dataBuf);
        const Xj_stream = Buffer.concat([encrypted, cipher.final()]);
        // split stream into an arr of small buffers of 16 bytes each
        let start = 0;
        let Xj = [];
        while (start + 16 <= Xj_stream.length) {
            Xj.push(Xj_stream.slice(start, start + 16));
            start += 16;
        }
        // TODO: do I need to return the same thing in two formats?
        return {Xj_stream, Xj};
    };

    const decrypt = (dataBuf, padding=true) => {
        const decipher = crypto.createDecipheriv(algo, key, '');
        decipher.setAutoPadding(padding);
        const decrypted = decipher.update(dataBuf);
        return Buffer.concat([decrypted, decipher.final()]);
    };
    // return an obj of two functions and the derived key
    return({encrypt, decrypt, key});
};


// =================================================================
// ............... 2. PRNG and encryption of fileName...............
// =================================================================

// ............... 2.1 a primitive to encrypt and decrypt filename ...............
/**
 * Use userChosenPassword to derive salt, key, iv, then construct a primitive to encrypt and decrypt filename.
 * The plain text filename will later be used to construct a PRNG for each file;
 * the encrypted filename wil be appended in front of the cipher of the file;
 * for Alice to recover a cipher text to plain text, she needs to decrypt the filename, use filename to reconstruct PRNG, etc..
 * @requires: the filename to encrypt is no longer than 2048 bits (256 bytes). This is a reasonable requirement
 *            because Windows, OSX and Linux, the maximum length of filename is 255 bytes.
 * @return: an obj of two functions and a key:
 *          - func encrypt:
 *              take a filename buffer, pad it to 2048 bits, encrypt and return the encrypted
 *          - func decrypt:
 *              take the data buffer, to decrypt and return the *untrimmed* buffer
 *          - key:
 *              a computationally-expensive derived key
 */
const createFilenameEnc = (userChosenPassword) =>{
    const total_len = 256;
    // key: 128 bits; block: 128 bits;
    const algo = 'aes-128-cbc'
    // salt is computed from filename, algo, password
    const hash = crypto.createHash('sha256');
    const salt = hash.update(`${total_len}${algo}${userChosenPassword}`).digest();
    // derive a key from password and salt
    const key = crypto.scryptSync(userChosenPassword, salt, 16);
    // iv is the last 128 bits of salt
    const iv = salt.slice(salt.length - 16, salt.length);

    const encrypt = (fileNameBuf) => {
        const paddingLen = total_len - fileNameBuf.length;
        // fileNameBuf is padded into a buffer of `total_len` bytes
        const toEnc = Buffer.concat([fileNameBuf, Buffer.alloc(paddingLen, ' ')]);

        const cipher = crypto.createCipheriv(algo, key, iv);
        // let the encrypted be the same len with `total_len` so it's easier to think about
        cipher.setAutoPadding(false);
        const encrypted = cipher.update(toEnc);
        return Buffer.concat([encrypted, cipher.final()]);
    }

    const decrypt = (toDec) => {
        const decipher = crypto.createDecipheriv(algo, key, iv);
        // let the decrypted be the same len with `total_len` so it's easier to think about
        // it's the caller's job to recover a trimmed string from the decrypted
        decipher.setAutoPadding(false);
        const decrypted = decipher.update(toDec);
        return Buffer.concat([decrypted, decipher.final()]);
    }

    return({encrypt, decrypt, key});
};


// ............... 2.2 PRNGs build with aes-128-ctr...............
// the file is encrypted, block size is S-bit,
// S must be a multiple of 128 because block size is 128,
// need PRG to generate S/128*64 = S/2 bits
// where num of blocks is the same as the encrypted file, but each block only has 64 bits

/**
 * Use userChosenPassword and the name of each file to derive salt, key and iv,
 * then construct a pseudorandom generator for a file, built wiht aes-128-ctr.
 * @return: an obj of one function and a key:
 *          - func gen:
 *              take the #bytes to generate and return the generated bytes in a buffer
 *          - key:
 *              a computational-expensive derived key
 */
const createPRNG = (userChosenPassword, fileName) => {
    // key: 128 bits; block: 128 bits;
    const algo = 'aes-128-ctr';
    // salt is computed from filename, algo, password
    const hash = crypto.createHash('sha256');
    const salt = hash.update(`${fileName}${algo}${userChosenPassword}`).digest();
    // derive a key from password and salt
    const key = crypto.scryptSync(userChosenPassword, salt, 16);
    // iv is the last 128 bits of salt
    const iv = salt.slice(salt.length - 16, salt.length);

    // numBytes = (number of Bytes in file-to-encrypt) / 2
    const gen = (numBlocks) => {
        const dataBuf = Buffer.alloc(numBlocks * 8, 0);
        const cipher = crypto.createCipheriv(algo, key, iv);
        const encrypted = cipher.update(dataBuf);
        const result = Buffer.concat([encrypted, cipher.final()]);
        // split result into an arr of small buffers of 8 bytes each
        let start = 0;
        let smallBufs = [];
        while (start + 8 <= result.length) {
            smallBufs.push(result.slice(start, start + 8));
            start += 8;
        }
        return smallBufs;
    };

    // an obj of gen function and the derived key
    return {gen, key};
}

/**
 * Wrapper of `createPRNG`, create a PRNG for each filename.
 */
const createPRNGs = (userChosenPassword, fileNames) => {
    let Gs = {};
    fileNames.forEach(fn => {
        Gs[fn] = createPRNG(userChosenPassword, fn);
    })
    return Gs;
}


// =========================================================
// ............... 3. two PRFs built on bf-cbc..............
// =========================================================

// bf-cbc: blow fish algorithm on cbc mode
// block size is 64 bits, key size can be 32~448 bits, here we choose key size 64 bits.

// ............... 3.1 smallF ...............
/**
 * Use userChosenPassword to derive salt, key and iv, then construct a pseudorandom function.
 * @return: an obj of one functions and a key:
 *          - func encrypt:
 *              take the data buffer to encrypt and return the encrypted
 *          - key:
 *              a computational-expensive derived key
 */
const createSmallF = (userChosenPassword) => {
    // key: 64 bits; block: 64 bits;
    // const algo = 'bf-cbc';    // bf-cbc is not available in Electron
    const algo = 'rc2-cbc';
    // salt is computed from algo and password
    const hash = crypto.createHash('sha256');
    const salt = hash.update(`${algo}${userChosenPassword}`).digest();
    // key is computed from password and salt
    const key = crypto.scryptSync(userChosenPassword, salt, 8);
    // iv is the last 64 bits of salt
    const iv = salt.slice(salt.length - 8, salt.length);

    const encrypt = (dataBuf) => {
        assert(dataBuf.length === 8);
        const cipher = crypto.createCipheriv(algo, key, iv);
        // disable padding, because we make sure to feed it the correct length (64 bits)
        cipher.setAutoPadding(false);
        const encrypted = cipher.update(dataBuf);
        return Buffer.concat([encrypted, cipher.final()]);
    };

    // TODO: rm this method
    // smallF doesnt need decrypt
    const decrypt = (dataBuf) => {
        assert(dataBuf.length === 8);
        const decipher = crypto.createDecipheriv(algo, key, iv);
        // disable padding, because we make sure to feed it the correct length (64 bits)
        decipher.setAutoPadding(false);
        const decrypted = decipher.update(dataBuf);
        return Buffer.concat([decrypted, decipher.final()]);
    };
    // return an obj of two functions and the derived key
    return({encrypt, decrypt, key});
};



// ............... 3.2 bigF ...............
/**
 * Unlike the previous functions,
 * big F don't need to go through the computational-costly key derivation process
 * instead, each time F is used, a computed key is passed to createBigG function.
 * The returned object has an encrypt method that does encryption.
 * (This is to make the interface across the primitives as similar as possible.)
 * @return: an obj of one function:
 *          function encrypt: take the data buffer to encrypt and return the encrypted
 */
const createBigF = () => {
    // key: 64 bits; block: 64 bits;
    // const algo = 'bf-cbc';    // bf-cbc is not available in Electron
    const algo = 'rc2-cbc';
    // iv is the last 64 bits of the hash of password
    const hash = crypto.createHash('sha256');
    const pre_iv = hash.update(`${algo}`).digest();
    const iv = pre_iv.slice(pre_iv.length - 8, pre_iv.length)

    const encrypt = (computedKey, dataBuf) => {
        const cipher = crypto.createCipheriv(algo, computedKey, iv);
        // disable padding, because we make sure to feed it the correct length
        cipher.setAutoPadding(false);
        const encrypted = cipher.update(dataBuf);
        const result = Buffer.concat([encrypted, cipher.final()]);
        return result;
    }
    // return an obj of one function
    return {encrypt};
}


// module.exports = {createPreEnc, createFilenameEnc, createPRNGs, createSmallF, createBigF};

// ===============================================
// ............... temp: playground...............
// ===============================================

// // @isFilePath: is true if `data` is a path to a file; is false if `data` is a data Buffer
// const encDec = (data, cryptoAlgo, isFilePath=true) => {
//     if (!isFilePath) {
//         console.log(`to encrypt: ${data}`);
//         let encrypted = cryptoAlgo.encrypt(data);
//         console.log(`encrypted: \n${encrypted.toString('hex')}`);
//
//         const decrypted = cryptoAlgo.decrypt(encrypted);
//         console.log(`decrypted: \n${decrypted.toString('utf-8')}`);
//
//         return ;
//     }
//
//     return new Promise((resolve, reject) => {
//         fs.readFile(data, (err, data) => {
//             if (err) reject(`Error in encDecFile: ${err}`);
//
//             const encrypted = cryptoAlgo.encrypt(data);
//             console.log(`encrypted: \n${encrypted.toString('hex')}`);
//             console.log(`encrypted length: \n${encrypted.length} bytes`);
//
//             const decrypted = cryptoAlgo.decrypt(encrypted);
//             console.log(`decrypted: \n${decrypted.toString('utf-8')}`);
//         });
//     });
// };


// const dir = './sampleFiles/'
// const files = [dir + 'sample.txt', dir + 'sample2.txt', dir + 'sample3.txt'];
// const pswd = 'this is password';
//
// // ..... PRNG usage .....
// const result = createPRNG(pswd, files);
// console.log(result[files[0]].gen(24));
//
// const e = createSmallF(pswd);
// const encrypted = e.encrypt(Buffer.alloc(8, 'q'));
// console.log(encrypted);
// console.log(encrypted.length);
//
// const decrypted = e.decrypt(encrypted);
// console.log(decrypted.toString().trim());
