/**
 * This file imports node js modules that will be used in the renderer pages.
 */

const electron = require('electron');
// const { remote } = electron;
const crypto = require('crypto');
const fs = require('fs');
const assert = require('assert');
const xor = require('buffer-xor');  // do to bitwise xor on two buffers
