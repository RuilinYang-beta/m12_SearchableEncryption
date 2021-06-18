/**
 * This file contains the html strings for page 2, 3, 4.
 * Each of them will be used in $('sth').replaceWith(htmlString) at some point.
 * Note this is not a good practice, the purpose is to maintain the same variable state
 * (eg. after the first page, `plains` is non-empty) from being erased.
 *
 * If not using this approach, but load a old_song2.html after clicking `next` in old_song1.html,
 * old_song2.html will need to load globalVar.js to have access to `plains` etc, but this will erase
 * `plains` to its initial state (an empty obj)!!
 */

const song2 = `
<div id="outmost2">
    <!-- css for the grid of the whole page-->
    <link rel="stylesheet" href="song2_grid.css">
    <!-- css for other parts specific for this page -->
    <link rel="stylesheet" href="song2.css">

    <div id="titleLine">
        <h3>(2) Prepare the cipher text</h3>
        <div class="help">
            <div class="question">?</div>
        </div>
    </div>

    <!-- for each of its immediate successor, add class "cell" -->
    <div class="grid" id="gridContainer">
        <!-- sidebar: primitives and files -->
        <div class="cell" id="primitives">
            <div>Primitives: </div>
            <div class="flex">
                <div id="bigE" class="block xs">E</div>
                <div id="smallE" class="block xs">e</div>
                <div id="G" class="block xs">Gs</div>
                <div id="smallF" class="block xs">f</div>
                <div id="bigF" class="block xs">F</div>
            </div>
        </div>
        <div class="cell" id="files">
            <div>Files: </div>
            <ul id="fileList">
            </ul>
        </div>
        <!-- 1st row: XjEnc and img -->
        <div class="cell textContainer" id="XjContainer">
            <p>pre-encrypted blocks (X<sub>j</sub>)</p>
            <textarea id="XjArea" disabled>the pre-encrypted blocks of the chosen file</textarea>
        </div>
        <div class="cell" id="imgEnc">
            <div id="imageTitleEnc">Alice's operation on file i, block j:</div>
            <!--pre-encryption-->
            <div id="WjEnc" class="block">W<sub>j</sub></div>
            <div id="da1Enc" class="block-trans arrowSmall">&darr;</div>
            <div id="XjEnc" class="block">X<sub>j</sub></div>
            <div id="laEnc" class="block-trans arrowSmall">&swarr;</div>
            <div id="ra1Enc" class="block-trans arrowSmall">&searr;</div>
            <!--xorEnc terms-->
            <div id="LjEnc" class="block">L<sub>j</sub></div>
            <div id="RjEnc" class="block">R<sub>j</sub></div>
            <div id="SjEnc" class="block">S<sub>j</sub></div>
            <div id="FjEnc" class="block">F<sub>k<sub>j</sub></sub>(S<sub>j</sub>)</div>
            <div id="kjEnc">where k<sub>j</sub> = f(L<sub>j</sub>)</div>
            <!--xorEnc operators-->
            <div id="xadEnc" class="block-trans arrow">&#10549;</div>
            <div id="xorEnc" class="block-trans">&nbsp&nbsp&nbsp⊕</div>
            <div id="xauEnc" class="block-trans arrow" style="">&#10548;</div>
            <!--cipher text-->
            <div id="CjEnc" class="block" >C<sub>j</sub></div>
            <div id="ra2Enc" class="block-trans arrow" >&rarr;</div>
            <!--PRNG related-->
            <div id="fnEnc" class="block-trans">filename i</div>
            <div id="da2Enc" class="block-trans arrow">&darr;</div>
            <div id="GiEnc" class="block xs">G<sub>i</sub></div>
            <div id="ra3Enc" class="block-trans arrow" >&rarr;</div>
        </div>
        <!-- 2nd row: Lj, Rj and kj -->
        <div class="cell textContainer" id="LjContainer">
            <p>left sub-blocks (L<sub>j</sub>)</p>
            <textarea id="LjArea" disabled>the left sub- blocks of the pre-encrypted blocks</textarea>
        </div>
        <div class="cell textContainer" id="RjContainer">
            <p>right sub-blocks (R<sub>j</sub>)</p>
            <textarea id="RjArea" disabled>the right sub- blocks of the pre-encrypted blocks</textarea>
        </div>
        <div class="cell textContainer" id="kjContainer">
            <p>computed key (k<sub>j</sub>)</p>
            <textarea id="kjArea" disabled>the key derived from Lj</textarea>
            <button id="kjButton" type="button">compute</button>
        </div>
        <!-- 3rd row: Sj, Fj and Cj -->
        <div class="cell textContainer" id="SjContainer">
            <p>pseudorandom blocks(S<sub>j</sub>)</p>
            <textarea id="SjArea" disabled>the pseudorandom blocks generated for the chosen file</textarea>
            <button id="SjButton" type="button">generate</button>
        </div>
        <div class="cell textContainer" id="FjContainer">
            <p>F<sub>k<sub>j</sub></sub>(S<sub>j</sub>)</p>
            <textarea id="FjArea" disabled>the F-encrypted pseudorandom blocks</textarea>
            <button id="FjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="CjContainer">
            <p>cipher blocks(C<sub>j</sub>)</p>
            <textarea id="CjArea" disabled>the cipher blocks for the chosen file</textarea>
            <button id="CjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="fnEncContainer">
            <p>encrypted filename</p>
            <textarea id="fnEncArea" disabled>the e-encrypted filename of the chosen file, it will be sent with the cipher text of a file.</textarea>
            <button id="fnEncButton" type="button">compute</button>
        </div>
        <!--footer row: next-->
        <button class="cell" id="next2">Next -></button>
        <!--animation related-->
        <div id="coverAll">
            <div id="aliceText">Alice (you)</div>
            <div id="aliceFiles">
                <img  src="./images/aliceFiles.png" alt="Alice's Files">
            </div>

            <div id="actionText">sends file to</div>
            <div id="bobText">Bob (cloud server)</div>
            <div id="hintText">Click anywhere to continue...</div>
        </div>
    </div>
    <script src="song2.js"></script>
</div>`;

const song3 = `
<div id="outmost3">
    <!-- css for the grid of the whole page-->
    <link rel="stylesheet" href="song3_grid.css">
    <!-- css for other parts specific for this page -->
    <link rel="stylesheet" href="song3.css">

    <div id="titleLine">
        <h3>(3) Search</h3>
        <div class="help">
            <div class="question">?</div>
        </div>
    </div>

    <!-- for each of its immediate successor, add class "cell" -->
    <div class="grid" id="gridContainer">
        <!-- sidebar: primitives and files -->
        <div class="cell" id="primitives">
            <div>Primitives: </div>
            <div class="flex">
                <div id="bigE" class="block xs">E</div>
                <div id="smallE" class="block xs">e</div>
                <div id="G" class="block xs">Gs</div>
                <div id="smallF" class="block xs">f</div>
                <div id="bigF" class="block xs">F</div>
            </div>
        </div>
        <div class="cell" id="files">
            <div>Files: </div>
            <ul id="fileList">
            </ul>
        </div>
        <!-- 1st row: searchTerm, queryTerm, img -->
        <!-- 1.1 searchTerm -->
        <div class="cell" id="searchTerm">
            <h3>Alice (you)</h3>
            <div id="chooseSearchTerm">
                <label>Enter (exactly) a block to search, the server will return all the documents containing this term.</label>
                <br>
                <input id="searchTermInput" placeholder="enter a Wj" required>
            </div>
            <button id="searchTermButton" type="button" >Confirm</button>
            <p id="searchTermNotice"></p>
        </div>
        <!-- 1.2 query term -->
        <div class="cell" id="queryTerm">
            <p>Alice computes the query terms to submit to the server: </p>
            <div>
                <label>X:</label>
                <input type="text" id="X" placeholder="X = E.encrypt(W)" disabled><br>
                <label>L: </label>
                <input type="text" id="L" placeholder="L = X[:64]" disabled><br>
                <label>k: </label>
                <input type="text" id="k" placeholder="k = f.encrypt(L)" disabled>
            </div>
            <button id="queryTermButton" type="button" disabled>Search</button>

        </div>
        <!-- 1.3 img -->
        <div class="cell" id="imgEnc">
            <div id="imageTitleEnc">recall how Alice made each cipher block:</div>
            <!--pre-encryption-->
            <div id="WjEnc" class="block">W<sub>j</sub></div>
            <div id="da1Enc" class="block-trans arrowSmall">&darr;</div>
            <div id="XjEnc" class="block">X<sub>j</sub></div>
            <div id="laEnc" class="block-trans arrowSmall">&swarr;</div>
            <div id="ra1Enc" class="block-trans arrowSmall">&searr;</div>
            <!--xorEnc terms-->
            <div id="LjEnc" class="block">L<sub>j</sub></div>
            <div id="RjEnc" class="block">R<sub>j</sub></div>
            <div id="SjEnc" class="block">S<sub>j</sub></div>
            <div id="FjEnc" class="block">F<sub>k<sub>j</sub></sub>(S<sub>j</sub>)</div>
            <div id="kjEnc">where k<sub>j</sub> = f(L<sub>j</sub>)</div>
            <!--xorEnc operators-->
            <div id="xadEnc" class="block-trans arrow">&#10549;</div>
            <div id="xorEnc" class="block-trans">&nbsp&nbsp&nbsp⊕</div>
            <div id="xauEnc" class="block-trans arrow" style="">&#10548;</div>
            <!--cipher text-->
            <div id="CjEnc" class="block" >C<sub>j</sub></div>
            <div id="ra2Enc" class="block-trans arrow" >&rarr;</div>
            <!--PRNG related-->
            <div id="fnEnc" class="block-trans">filename i</div>
            <div id="da2Enc" class="block-trans arrow">&darr;</div>
            <div id="GiEnc" class="block xs">G<sub>i</sub></div>
            <div id="ra3Enc" class="block-trans arrow" >&rarr;</div>
        </div>
        <!-- 2nd row: received, CjEnc, recovered SjEnc, img_search -->
        <div class="cell" id="receivedTerm">
            <h3>Bob (cloud server) </h3>
            <p>Received query terms from Alice: </p>
            <div>
                <label>X:</label>
                <input type="text" id="receivedX" placeholder="X = E.encrypt(W)" disabled><br>
                <label>k: </label>
                <input type="text" id="receivedk" placeholder="k = f.encrypt(L)" disabled>
            </div>
            <p>Bob will find all the documents containing the search term to return to Alice.</p>
        </div>
        <div class="cell textContainer" id="CjContainer">
            <p>cipher blocks(C<sub>j</sub>)</p>
            <textarea id="CjArea" disabled>the cipher blocks for the chosen file</textarea>
        </div>
        <div class="cell textContainer" id="bSjContainer">
            <p>recovered S<sub>j</sub></p>
            <textarea id="bSjArea" disabled>the recovered Sj: &#xa Sj = Cj[:64] ⊕ X[:64]</textarea>
            <button id="bSjButton" type="button">compute</button>
        </div>
        <div class="cell" id="imgSearch">
            <div id="imageTitleSearch">Bob's operation on file i, block j:</div>
            <!-- split X -->
            <div id="XSearch" class="block">X from Alice</div>
            <div id="laSearch" class="block-trans arrowSmall">&swarr;</div>
            <div id="ra1Search" class="block-trans arrowSmall">&searr;</div>
            <!-- xorEnc terms -->
            <div id="LSearch" class="block">L</div>
            <div id="RSearch" class="block">R</div>
            <div id="CjSearch" class="block">C<sub>j</sub></div>
            <!-- xorEnc operators-->
            <div id="xadSearch" class="block-trans arrow">&#10549;</div>
            <div id="xorSearch" class="block-trans">&nbsp&nbsp&nbsp⊕</div>
            <div id="xauSearch" class="block-trans arrow" style="">&#10548;</div>
            <div id="ra2Search" class="block-trans arrow" >&rarr;</div>
            <!-- xorEnc results -->
            <div id="SjSearch" class="block">S<sub>j</sub></div>
            <div id="FjSearch" class="block">F<sub>j</sub></div>
            <div id="FjSearch_comp" class="block">F<sub>k</sub>(S<sub>j</sub>)</div>
            <div id="kSearch" class="block-trans">k from Alice</div>
            <!-- question marks -->
            <div id="q2Search" class="block-trans">(?)</div>
        </div>
        <!-- 3rd row: recovered FjEnc, computedFj, isEqual, toReturn -->
        <div class="cell textContainer" id="bFjContainer">
            <p>recovered F<sub>j</sub></p>
            <textarea id="bFjArea" disabled>the recovered Fj: &#xa Fj = Cj[64:] ⊕ X[64:] </textarea>
            <button id="bFjButton" type="button">compute</button>
        </div>
        <div class="cell textContainer" id="bComputedFjContainer">
            <p>computed F<sub>j</sub></p>
            <textarea id="bComputedFjArea" disabled>the computed Fj: &#xa Fj = F(k, Sj) &#xa (Bob knows how to construct an F)</textarea>
            <button id="bComputedFjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="isEqualContainer">
            <p>isEqual?</p>
            <textarea id="isEqualArea" disabled>is computed Fj equal to actual Fj for each block? </textarea>
            <button id="isEqualButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="toReturnContainer">
            <p>toReturn?</p>
            <textarea id="toReturnArea" disabled>should I (Bob, the server) return this file to Alice?</textarea>
        </div>
        <!--footer row: next-->
        <button class="cell" id="next3" disabled>Next -></button>
        <!--animation related-->
        <div id="coverAlice"></div>
        <div id="coverBob"></div>
        <div id="coverAll">
            <div id="aliceText">Alice (you)</div>
            <div id="aliceFiles">
                <img  src="./images/queryTerms.png" alt="Alice's Query Terms">
            </div>
            <div id="actionText">sends query terms to --></div>
            <div id="bobText">Bob (cloud server)</div>
            <div id="hintText">Click anywhere to continue...</div>
        </div>
        <div id="coverAll2">
            <div id="aliceText2">Alice (you)</div>
            <div id="aliceFiles2">
                <img  src="./images/returnedFiles.png" alt="returned files from Bob">
            </div>
            <div id="actionText2"><-- return files to</div>
            <div id="bobText2">Bob (cloud server)</div>
            <div id="hintText2">Click anywhere to continue...</div>
        </div>
    </div>
    <script src="song3.js"></script>
</div>`;

const song4 = `
<div id="outmost4">
    <!-- css for the grid of the whole page-->
    <link rel="stylesheet" href="song4_grid.css">
    <!-- css for other parts specific for this page -->
    <link rel="stylesheet" href="song4.css">

    <div id="titleLine">
        <h3>(4) Alice's decryption to get file content</h3>
        <div class="help">
            <div class="question">?</div>
        </div>
    </div>

    <!-- for each of its immediate successor, add class "cell" -->
    <div class="grid" id="gridContainer">
        <!-- sidebar: primitives and files -->
        <div class="cell" id="primitives">
            <div>Primitives: </div>
            <div class="flex">
                <div id="bigE" class="block xs">E</div>
                <div id="smallE" class="block xs">e</div>
                <div id="G" class="block xs">Gs</div>
                <div id="smallF" class="block xs">f</div>
                <div id="bigF" class="block xs">F</div>
            </div>
        </div>
        <div class="cell" id="files">
            <div>Files: </div>
            <ul id="fileList">
            </ul>
        </div>
        <!-- 1st row: Cj, filename, img -->
        <!-- 1.1 Cj -->
        <div class="cell textContainer" id="CjContainer">
            <p>cipher blocks(C<sub>j</sub>)</p>
            <textarea id="CjArea" disabled>the cipher blocks for the chosen file</textarea>
        </div>
        <!-- 1.2 filename -->
        <div class="cell" id="fnDecButton">
            decrypt all filenames, this is necessary to recover S<sub>j</sub> for each block <br>(see how the names in the file list changes).
            <button>decrypt filenames</button>
        </div>
        <!-- 1.3 imgEnc -->
        <div class="cell" id="imgEnc">
            <div id="imageTitleEnc">recall how Alice made each cipher block:</div>
            <!--pre-encryption-->
            <div id="WjEnc" class="block">W<sub>j</sub></div>
            <div id="da1Enc" class="block-trans arrowSmall">&darr;</div>
            <div id="XjEnc" class="block">X<sub>j</sub></div>
            <div id="laEnc" class="block-trans arrowSmall">&swarr;</div>
            <div id="ra1Enc" class="block-trans arrowSmall">&searr;</div>
            <!--xorEnc terms-->
            <div id="LjEnc" class="block">L<sub>j</sub></div>
            <div id="RjEnc" class="block">R<sub>j</sub></div>
            <div id="SjEnc" class="block">S<sub>j</sub></div>
            <div id="FjEnc" class="block">F<sub>k<sub>j</sub></sub>(S<sub>j</sub>)</div>
            <div id="kjEnc">where k<sub>j</sub> = f(L<sub>j</sub>)</div>
            <!--xorEnc operators-->
            <div id="xadEnc" class="block-trans arrow">&#10549;</div>
            <div id="xorEnc" class="block-trans">&nbsp&nbsp&nbsp⊕</div>
            <div id="xauEnc" class="block-trans arrow" style="">&#10548;</div>
            <!--cipher text-->
            <div id="CjEnc" class="block" >C<sub>j</sub></div>
            <div id="ra2Enc" class="block-trans arrow" >&rarr;</div>
            <!--PRNG related-->
            <div id="fnEnc" class="block-trans">filename i</div>
            <div id="da2Enc" class="block-trans arrow">&darr;</div>
            <div id="GiEnc" class="block xs">G<sub>i</sub></div>
            <div id="ra3Enc" class="block-trans arrow" >&rarr;</div>
        </div>
        <!-- 2nd row: Sj, Lj, imgDec -->
        <div class="cell textContainer" id="SjContainer">
            <p>computed S<sub>j</sub></p>
            <textarea id="SjArea" disabled>the re-generated pseudorandom blocks</textarea>
            <button id="SjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="LjContainer">
            <p>computed L<sub>j</sub></p>
            <textarea id="LjArea" disabled>the recovered Lj: &#xa Lj = Cj[:64] ⊕ Sj</textarea>
            <button id="LjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell" id="imgDec">
            <div id="imageTitleDec">Invert the encryption process to decrypt: </div>
            <!--PRNG related-->
            <div id="fnDec" class="block-trans">filename i</div>
            <div id="da2Dec" class="block-trans arrow">&darr;</div>
            <div id="GiDec" class="block xs">G<sub>i</sub></div>
            <div id="ra3Dec" class="block-trans arrow" >&rarr;</div>
            <!--xorDec terms-->
            <div id="CjDec" class="block" >C<sub>j</sub></div>
            <div id="SjDec" class="block">S<sub>j</sub></div>
            <div id="FjDec" class="block">F<sub>k<sub>j</sub></sub>(S<sub>j</sub>)</div>
            <div id="kjDec">where k<sub>j</sub> = f(L<sub>j</sub>)</div>
            <!--xorEnc operators-->
            <div id="xadDec" class="block-trans arrow">&#10549;</div>
            <div id="xorDec" class="block-trans">&nbsp&nbsp&nbsp⊕</div>
            <div id="xauDec" class="block-trans arrow" style="">&#10548;</div>
            <div id="ra2Dec" class="block-trans arrow" >&rarr;</div>
            <!--pre-encryption-->
            <div id="WjDec" class="block">W<sub>j</sub></div>
            <div id="da1Dec" class="block-trans arrowSmall">&darr;</div>
            <div id="XjDec" class="block">X<sub>j</sub></div>
            <div id="laDec" class="block-trans arrowSmall">&swarr;</div>
            <div id="ra1Dec" class="block-trans arrowSmall">&searr;</div>
            <!--cipher text-->
            <div id="LjDec" class="block">L<sub>j</sub></div>
            <div id="RjDec" class="block">R<sub>j</sub></div>
        </div>
        <!-- 3rd row: kjEnc, FjEnc, RjEnc, WjEnc -->
        <div class="cell textContainer" id="kjContainer">
            <p>computed k<sub>j</sub></p>
            <textarea id="kjArea" disabled>the re-computed kj: &#xa kj = f(Lj)</textarea>
            <button id="kjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="FjContainer">
            <p>computed F<sub>j</sub></p>
            <textarea id="FjArea" disabled>the re-computed Fj: &#xa Fj = F(kj, Sj)</textarea>
            <button id="FjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="RjContainer">
            <p>computed R<sub>j</sub></p>
            <textarea id="RjArea" disabled>the recovered Rj: &#xa Rj = Cj[:64] ⊕ Fj</textarea>
            <button id="RjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="WjContainer">
            <p>computed W<sub>j</sub></p>
            <textarea id="WjArea" disabled>the recovered Word Wj: &#xa Wj = E.decrypt(Xj)</textarea>
            <button id="WjButton" type="button" disabled>compute</button>
        </div>
        <!--footer row: finish-->
        <button class="cell" id="finish" disabled>Finish -></button>
    </div>
    <script src="song4.js"></script>
</div>`;

const welcome = `
<div id="outmostWelcome" style="display: flex; flex-direction: column;align-items: center">
    <h1>Welcome to Searchable Encryption Visualization</h1>

    <div >
        <p style="font-size: 19px">Start from the 'Intro' menu for background information;</p>
        <p style="font-size: 19px">Start from 'Scheme' menu to play with a Searchable Encryption scheme.</p>
    </div>
</div>`;