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

const song1 = `
<div id="outmost1">
    <!-- css for the grid of the whole page-->
    <link rel="stylesheet" href="song1_grid.css">
    <!-- css for other parts specific for this page -->
    <link rel="stylesheet" href="song1.css">

    <div id="titleLine">
        <h3>(1) Initialization and pre-encryption</h3>
        <div class="help">
            <div class="question">?</div>
        </div>
    </div>

    <div class="grid">
        <!--sidebar: primitives and files-->
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
        <!--1st row: intro, form and img-->
        <!-- 1.1 choose file -->
        <div class="cell" id="chooseFileCell">
            <div id="chooseFile">
                <label>1. Select some files to encrypt:</label>
                <input type="file" id="fileInput" multiple />
            </div>
            <p>Hint: <br>You can only choose files in the same folder.<br>Click on different filenames to see what happens.</p>
        </div>
        <!-- 1.2 password -->
        <div class="cell" id="choosePasswordCell">
            <div id="choosePassword">
                <label>2. Set a password. The primitives will be derived from your password.</label>
                <br>
                <input id="passwordInput" required>
                <button id="passwordButton" type="button" >Confirm</button>
                <p id="passwordNotice">(It can take a few seconds)</p>
            </div>
        </div>
        <!-- 1.3 img -->
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
        <!--2nd and 3rd row-->
        <div class="cell textContainer" id="plainContainer">
            <p>plain text</p>
            <textarea id="plainArea" disabled>the plain text of the chosen file</textarea>
        </div>
        <div class="cell textContainer" id="plainBlockContainer">
            <p>plain text in 128-bit blocks</p>
            <textarea id="plainBlockArea" disabled>the plain text of the chosen file in 128-bit blocks (a 128-bit block is a Word)</textarea>
            <form id="hintSearch">
                <input type="checkbox" id="hintSearchBox">
                <label for="hintSearch">I have memorized a block as the keyword to search later.</label>
            </form>
        </div>
        <div class="cell textContainer" id="WjContainer">
            <p>blocks in hex(W<sub>j</sub>)</p>
            <textarea id="WjArea" disabled>the Words of the chosen file in hex encoding</textarea>
        </div>
        <div class="cell textContainer" id="XjContainer">
            <p>pre-encrypted blocks (X<sub>j</sub>)</p>
            <textarea id="XjArea" disabled>the pre-encrypted Words of the chosen file</textarea>
            <button id="XjButton" type="button" disabled>Pre encrypt</button>
        </div>
        <!--footer row: next-->
        <form id="animationForm">
            <input type="checkbox" id="animation1">
            <label for="animation1">Enable animation?</label>
        </form>

        <button class="cell" id="next1" disabled>Next -></button>
    </div>
    <script src="song1.js"></script>
</div>`;


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
            <div id="FjEnc" class="block">P<sub>j</sub></div>
            <div id="kjEnc">where k<sub>j</sub> = f(L<sub>j</sub>), P<sub>j</sub> = F(k<sub>j</sub>, S<sub>j</sub>)</div>
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
            <p>P<sub>j</sub></p>
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
<!--        <button class="cell" id="back2"><- Back</button>-->
        <button class="cell" id="next2" disabled>Next -></button>
        <!--animation related-->
        <div id="coverAll">
            <div id="aliceText">Alice (you)</div>
            <div id="aliceFiles">
                <img src="./images/aliceFiles.png" alt="Alice's Files">
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
                <label>Enter a block (content between a pair of [square brackets]) to search for all the files containing this term.</label>
                <br>
                <input id="searchTermInput" placeholder="enter a Wj" required>
            </div>
            <button id="searchTermButton" type="button" >Confirm</button>
            <p id="searchTermNotice" style="color: #ff6f69"></p>
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
            <div id="FjEnc" class="block">P<sub>j</sub></div>
            <div id="kjEnc">where k<sub>j</sub> = f(L<sub>j</sub>), P<sub>j</sub> = F(k<sub>j</sub>, S<sub>j</sub>)</div>
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
            <div id="FjSearch" class="block">P<sub>j</sub></div>
            <div id="FjSearch_comp" class="block" style="font-size: 13px">F(k, S<sub>j</sub>)</div>
            <div id="kSearch" class="block-trans">k from Alice</div>
            <!-- question marks -->
            <div id="q2Search" class="block-trans">(?)</div>
        </div>
        <!-- 3rd row: recovered FjEnc, computedFj, isEqual, toReturn -->
        <div class="cell textContainer" id="bFjContainer">
            <p>recovered P<sub>j</sub></p>
            <textarea id="bFjArea" disabled>the recovered Pj: &#xa Pj = Cj[64:] ⊕ L </textarea>
            <button id="bFjButton" type="button">compute</button>
        </div>
        <div class="cell textContainer" id="bComputedFjContainer">
            <p>F(k, S<sub>j</sub>)</p>
            <textarea id="bComputedFjArea" disabled>A value computed from k and Sj.(Bob knows how to construct an F)</textarea>
            <button id="bComputedFjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="isEqualContainer">
            <p>isEqual?</p>
            <textarea id="isEqualArea" disabled>is Pj equal to F(k, Sj) for each block? &#xa &#xa In other words, is there a relationship between the recovered Sj and Pj?</textarea>
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
            Now the filenames are encrypted. Decrypt all filenames, this is necessary to recover S<sub>j</sub> for each block <br>
            <button>decrypt filenames</button>
            <p id="filenameNotice" style="padding: 0px;margin: 0 auto"></p>
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
            <div id="FjEnc" class="block">P<sub>j</sub></div>
            <div id="kjEnc">where k<sub>j</sub> = f(L<sub>j</sub>), P<sub>j</sub> = F(k<sub>j</sub>, S<sub>j</sub>)</div>
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
            <div id="FjDec" class="block">P<sub>j</sub></div>
            <div id="kjDec">where k<sub>j</sub> = f(L<sub>j</sub>), P<sub>j</sub> = F(k<sub>j</sub>, S<sub>j</sub>)</div>
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
            <p>computed P<sub>j</sub></p>
            <textarea id="FjArea" disabled>the re-computed Pj: &#xa Pj = F(kj, Sj)</textarea>
            <button id="FjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="RjContainer">
            <p>computed R<sub>j</sub></p>
            <textarea id="RjArea" disabled>the recovered Rj: &#xa Rj = Cj[:64] ⊕ Pj</textarea>
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
<div id="outmostWelcome" style="display: flex; flex-direction: column; margin: 0px 20px">
    <h1>Welcome to Searchable Encryption Visualization</h1>

    <div >
        <p style="font-size: 22px">For newcomers → Start from the 'Intro' menu for background information;</p>
        <p style="font-size: 17px;margin-left: 20px">- There is an introduction of why we need Searchable Encryption</p>
        <p style="font-size: 17px;margin-left: 20px">- And introduction to specific schemes. (right now only Song et al(2000) scheme)</p>
        <p style="font-size: 22px">After brush up the background → Start from 'Scheme' menu to play with a Searchable Encryption scheme.</p>
        <p style="font-size: 17px;margin-left: 20px">- If you get lost while experimenting, you can open an intro window side-by-side.</p>
    </div>
</div>`;