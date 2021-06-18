/**
 * This file contains global variables and functions that can be accessed across pages.
 */


// ============== for dev ==============

let _dummy = 'aaaaaaaaaaaaaaa ';
let _print = (Xjs, displayVarName) => {
    // log variable name
    console.log(`---------- ${displayVarName} ----------`);

    // log variable values
    for (let fn in Xjs) {
        console.log(`${fn}: \n${Xjs[fn].map(e => "    " + e.toString('hex')).join('\n')}`);
    }
}

// ============== UI helper variables ==============

// help to decide whether to return a file
const isTrue = (e) => e;

// display {filename: [arr_of_buffers]} on screen
let displayBlocks = (blocksArr, encoding='hex') => {
    let toDisplay = '';
    for (let block of blocksArr){
        toDisplay += `[${block.toString(encoding)}],`;
    }
    return toDisplay;
}

// a flag marking whether to show animation (alice send files, send query terms, receive files)
let toAnimate;

const hoverFiles = () => {
    $('#files').hover(function() {
        $('#fnEnc').addClass('highlight');
    }, function () {
        $('#fnEnc').removeClass('highlight');
    })
}

// hover effect on primitives (highlight & show key as tooltip)
const hoverPrimitives = () => {
    $('.flex>.xs.block').hover(function() {
        $(this).addClass('highlight');
        // get which primitive is hovered
        let p = $(this).html();
        switch (p) {
            case 'f':
                $(this).append(`<p class="key" style="width: 100px;">key:<br>${primitives[p].key.toString('hex')}</p>`)
                break;
            case 'F':
                $(this).append(`<p class="key" style="width: 190px;">(F is independent from your password)</p>`)
                break;
            case 'Gs':
                let toShow = '';
                for (let fn in Gs) {
                    toShow += `key for ${fn}:\n`;
                    toShow += Gs[fn].key.toString('hex');
                    toShow += '\n';
                }
                $(this).append(`<p class="key" style="width: 190px;">${toShow.trim()}</p>`)
                break;
            default:
                // 'E' or 'e'
                $(this).append(`<p class="key" style="width: 190px;">key:<br>${primitives[p].key.toString('hex')}</p>`)
        }
    }, function () {
        $(this).removeClass('highlight');
        $('.flex>.xs.block p').remove();
    })
}

// hover effect on text areas (highlight related parts in img & primitive)
const hoverTextAreas = (onSelector, highlightSelector) => {
    $(onSelector).hover(function () {
        $(highlightSelector).addClass('highlight');
    }, function () {
        $(highlightSelector).removeClass('highlight');
    })
}

// URL for page help
const songHelp = 'https://docs.google.com/presentation/d/e/2PACX-1vSTyHQqQQR08CGmxV-RoAd0s8WfJd_xk3l-tys7tewUUXnTlwrUnqwKyG_7usPaeQqY9bFN0pEMQIdc/pub?start=true&loop=false&delayms=60000';

// ============== crypto-related variables ==============

// ------------------- primitives -------------------
let E;   // pre encryption
let e;   // encrypt filename
let Gs;  // PRNG for all the files {fileName: PRNG_of_the_file, ...}
let f;   // compute k_i for each block
let F;   // compute the block to XOR with R_i

// this obj allows js code access primitive obj from their (string) names
let primitives = {}

// ------------------- other variables -------------------
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