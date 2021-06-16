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

const song2_old = `
<h2>(2) Prepare the cipher text</h2>

<!-- 1st row -->
<div class="flex-container">
    <!-- primitives -->
    <div style="border-style: dotted;border-color: gainsboro;">
        <div id="E" class="block xs">E</div>
        <div id="G" class="block xs">G</div>
        <div id="smallF" class="block xs">f</div>
        <div id="bigF" class="block xs">F</div>
    </div>

    <!-- pre-encrypted, Si -->
    <div class="flex-container" style="border-style: dotted;border-color: gainsboro;margin-left: 20px;margin-right: 20px;width: 450px;">
        <div id="XjContainer">
            <p>pre-encrypted</p>
            <textarea id="XjContainer" disabled>display the pre-encrypted cipher of the chosen file</textarea>
        </div>

        <div id="SiContainer">
            <p>S<sub>i</sub></p>
            <textarea id="SiArea" style="height: 220px;" disabled>display the pseudorandom bytes that will be applied to encrypt the chosen file</textarea>
            <button id="SiButton" type="button" class="centerOfParent" disabled>generate S<sub>i</sub></button>
        </div>
    </div>

    <!-- image -->
    <div style="border-style: dotted;border-color: gainsboro;">
        <!-- Wi -->
        <div id="Wi" class="block big">
            W<sub>i</sub>
        </div>

        <!-- down arrow -->
        <div id="darr" class="block-trans big arrow">
            &darr;
        </div>

        <!-- Xi -->
        <div id="Xi" class="block big">
            X<sub>i</sub>
        </div>

        <!-- two arrows -->
        <div class="flex-container">
            <div id="dlarr" class="block-trans small arrow">
                &swarr;
            </div>

            <div id="drarr" class="block-trans small arrow">
                &searr;
            </div>
        </div>

        <!-- Li, Ri, arr to xor -->
        <div class="flex-container">
            <div id="Li" class="block small">
                L<sub>i</sub>
            </div>

            <div id="Ri" class="block small">
                R<sub>i</sub>
            </div>

            <div id="dxorarr" class="block-trans small arrow">
                &#10549;
            </div>
        </div>

        <!-- empty, xor, and Ci -->
        <div class="flex-container">
            <div class="block-trans big"></div>
            <div id="xor"
                 class="block-trans small"
                 style="text-align:right;font-size:25px;width: 55px;">
                ⊕
            </div>

            <div id="rarr" class="block-trans small arrow">
                &rarr;
            </div>

            <div id="Ci" class="block big">
                C<sub>i</sub>
            </div>
        </div>

        <!-- Si, Fk(Si), and ne arrow -->
        <div class="flex-container">
            <div id="Si" class="block small">
                S<sub>i</sub>
            </div>

            <div id="Fi" class="block small">
                F<sub>k<sub>i</sub></sub>(S<sub>i</sub>)
            </div>

            <div id="uxorarr" class="block-trans small arrow" style="">
                &#10548;
            </div>
        </div>

        <!-- formula about ki -->
        <div id="ki">
            where k<sub>i</sub> = f<sub>k'</sub>(L<sub>i</sub>)
        </div>
    </div>
</div>


<!-- 2nd row -->
<div class="flex-container" style="margin-top: 10px;height: 280px;">

    <!-- chosen files -->
    <div style="margin-right: 20px">
        <p>files</p>
        <ul id="fileList" style="border-style: dotted;border-color: gainsboro;">
        </ul>
    </div>


    <!-- three text areas -->
    <div class="flex-container">
        <div id="KiContainer">
            <p>k<sub>i</sub></p>
            <textarea id="KiArea" style="height: 220px;" disabled>display the computed key that will be used to encrypt the chosen file</textarea>
            <button id="KiButton" type="button" class="centerOfParent" disabled>compute k<sub>i</sub></button>
        </div>

        <div id="FiContainer">
            <p>F<sub>k<sub>i</sub></sub>(S<sub>i</sub>)</p>
            <textarea id="FiArea" style="height: 220px;" disabled>display the encrypted pseudorandom bytes that will be used to encrypt the chosen file</textarea>
            <button id="FiButton" type="button" class="centerOfParent" disabled>compute F<sub>k<sub>i</sub></sub>(S<sub>i</sub>)</button>
        </div>

        <div id="CiContainer">
            <p>C<sub>i</sub></p>
            <textarea id="CiArea" style="height: 220px;" disabled>display the (final) cipher text of the chosen file</textarea>
            <button id="CiButton" type="button" class="centerOfParent" disabled>compute C<sub>i</sub></button>
        </div>
    </div>
</div>

<!-- 3rd row: next page -->
<div style="text-align: right;margin-top: 15px;width: 800px;">
    <button id="next2">Next &rarr;</button>
</div>`;


const song2 = `
<div id="outmost2">
    <!-- css for the grid of the whole page-->
    <link rel="stylesheet" href="song2_grid.css">
    <!-- css for other parts specific for this page -->
    <link rel="stylesheet" href="song2.css">

    <h3>(2) Prepare the cipher text</h3>

    <!-- for each of its immediate successor, add class "cell" -->
    <div class="grid" id="gridContainer">
        <!-- sidebar: primitives and files -->
        <div class="cell" id="primitives">
            <div>Primitives: </div>
            <div class="flex">
                <div id="bigE" class="block xs">E</div>
                <div id="G" class="block xs">Gs</div>
                <div id="smallF" class="block xs">f</div>
                <div id="bigF" class="block xs">F</div>
                <div id="smallE" class="block xs">e</div>
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
            <textarea id="XjArea" disabled>display the pre-encrypted blocks of the chosen file</textarea>
        </div>
        <div class="cell" id="imgEnc">
            <div id="imageTitleEnc">operation on file i, block j:</div>
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
            <div id="kjEnc">where k<sub>j</sub> = f<sub>k'</sub>(L<sub>j</sub>)</div>
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
        <!-- 2nd row: Lj, RjEnc and kjEnc -->
        <div class="cell textContainer" id="LjContainer">
            <p>left sub-blocks (L<sub>j</sub>)</p>
            <textarea id="LjArea" disabled>display the left sub-block of the pre-encrypted blocks</textarea>
        </div>
        <div class="cell textContainer" id="RjContainer">
            <p>right sub-blocks (R<sub>j</sub>)</p>
            <textarea id="RjArea" disabled>display the right sub-block of the pre-encrypted blocks</textarea>
        </div>
        <div class="cell textContainer" id="kjContainer">
            <p>computed key (k<sub>j</sub>)</p>
            <textarea id="kjArea" disabled>display the key derived from Li</textarea>
            <button id="kjButton" type="button">compute</button>
        </div>
        <!-- 3rd row: SjEnc, FjEnc and CjEnc -->
        <div class="cell textContainer" id="SjContainer">
            <p>pseudorandom blocks(S<sub>j</sub>)</p>
            <textarea id="SjArea" disabled>display the pseudorandom blocks generated specifically for the chosen file</textarea>
            <button id="SjButton" type="button">generate</button>
        </div>
        <div class="cell textContainer" id="FjContainer">
            <p>F<sub>k<sub>j</sub></sub>(S<sub>j</sub>)</p>
            <textarea id="FjArea" disabled>display the encrypted pseudorandom blocks</textarea>
            <button id="FjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="CjContainer">
            <p>cipher blocks(C<sub>j</sub>)</p>
            <textarea id="CjArea" disabled>display the cipher blocks for the chosen file</textarea>
            <button id="CjButton" type="button" disabled>compute</button>
        </div>
        <!--footer row: next-->
        <button class="cell" id="next2" hidden>Next -></button>
    </div>

    <script>
        $('#next2').click(function() {
            $('#outmost2').replaceWith(song3);
        })
    </script>
    <script src="song2.js"></script>
</div>`;

const song3 = `
<div id="outmost3">
    <!-- css for the grid of the whole page-->
    <link rel="stylesheet" href="song3_grid.css">
    <!-- css for other parts specific for this page -->
    <link rel="stylesheet" href="song3.css">

    <h3>(3) Search</h3>

    <!-- for each of its immediate successor, add class "cell" -->
    <div class="grid" id="gridContainer">
        <!-- sidebar: primitives and files -->
        <div class="cell" id="primitives">
            <div>Primitives: </div>
            <div class="flex">
                <div id="bigE" class="block xs">E</div>
                <div id="G" class="block xs">Gs</div>
                <div id="smallF" class="block xs">f</div>
                <div id="bigF" class="block xs">F</div>
                <div id="smallE" class="block xs">e</div>
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
            <div id="kjEnc">where k<sub>j</sub> = f<sub>k'</sub>(L<sub>j</sub>)</div>
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
            <textarea id="CjArea" disabled>display the cipher blocks for the chosen file</textarea>
        </div>
        <div class="cell textContainer" id="bSjContainer">
            <p>recovered S<sub>j</sub></p>
            <textarea id="bSjArea" disabled>display the recovered Sj: &#xa Sj = Cj[:64] ⊕ X[:64]</textarea>
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
            <div id="FjSearch" class="block">F<sub>k</sub>(S<sub>j</sub>)</div>
            <div id="kSearch" class="block-trans">(k from Alice)</div>
            <!-- question marks -->
            <div id="q1Search" class="block-trans">(?)</div>
            <div id="q2Search" class="block-trans">(?)</div>
        </div>
        <!-- 3rd row: recovered FjEnc, computedFj, isEqual, toReturn -->
        <div class="cell textContainer" id="bFjContainer">
            <p>recovered F<sub>j</sub></p>
            <textarea id="bFjArea" disabled>display the recovered Fj: &#xa Fj = Cj[64:] ⊕ X[64:] </textarea>
            <button id="bFjButton" type="button">compute</button>
        </div>
        <div class="cell textContainer" id="bComputedFjContainer">
            <p>computed F<sub>j</sub></p>
            <textarea id="bComputedFjArea" disabled>display the computed Fj: &#xa Fj = F(k, Sj) &#xa (Bob knows how to construct an F)</textarea>
            <button id="bComputedFjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="isEqualContainer">
            <p>isEqual?</p>
            <textarea id="isEqualArea" disabled>is computed Fj equal to actual Fj for each block? </textarea>
            <button id="isEqualButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="toReturnContainer">
            <p>toReturn?</p>
            <textarea id="toReturnArea" disabled>should I (Bob, the server) return the file to Alice?</textarea>
        </div>
        <!--footer row: next-->
        <button class="cell" id="next3">Next -></button>
        <!--other: blackout effect-->
        <div id="coverAlice"></div>
        <!--        <div id="coverBob"></div>-->
    </div>
    <script>
        $('#next3').click(function() {
            $('#outmost3').replaceWith(song4);
        })
    </script>
    <script src="song3.js"></script>
</div>`;

const song4 = `
<div id="outmost4">
    <!-- css for the grid of the whole page-->
    <link rel="stylesheet" href="song4_grid.css">
    <!-- css for other parts specific for this page -->
    <link rel="stylesheet" href="song4.css">

    <h3>(4) Alice's decryption to get file content</h3>

    <!-- for each of its immediate successor, add class "cell" -->
    <div class="grid" id="gridContainer">
        <!-- sidebar: primitives and files -->
        <div class="cell" id="primitives">
            <div>Primitives: </div>
            <div class="flex">
                <div id="bigE" class="block xs">E</div>
                <div id="G" class="block xs">Gs</div>
                <div id="smallF" class="block xs">f</div>
                <div id="bigF" class="block xs">F</div>
                <div id="smallE" class="block xs">e</div>
            </div>
        </div>
        <div class="cell" id="files">
            <div>Files: </div>
            <ul id="fileList">
            </ul>
        </div>
        <!-- 1st row: CjEnc, filename, img -->
        <!-- 1.1 Cj -->
        <div class="cell textContainer" id="CjContainer">
            <p>cipher blocks(C<sub>j</sub>)</p>
            <textarea id="CjArea" disabled>display the cipher blocks for the chosen file</textarea>
        </div>
        <!-- 1.2 filename -->
        <div class="cell" id="filename">a button to decrypt all filenames (and change the file list)</div>
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
            <div id="kjEnc">where k<sub>j</sub> = f<sub>k'</sub>(L<sub>j</sub>)</div>
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
        <!-- 2nd row: SjEnc, Lj, img_dec -->
        <div class="cell textContainer" id="SjContainer">
            <p>computed S<sub>j</sub></p>
            <textarea id="SjArea" disabled>display the computed Sj: &#xa Sj = Cj[:64] ⊕ X[:64]</textarea>
            <button id="SjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="LjContainer">
            <p>computed L<sub>j</sub></p>
            <textarea id="LjArea" disabled>display the computed Sj: &#xa Sj = Cj[:64] ⊕ X[:64]</textarea>
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
            <div id="kjDec">where k<sub>j</sub> = f<sub>k'</sub>(L<sub>j</sub>)</div>
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
            <textarea id="kjArea" disabled>display the computed Sj: &#xa Sj = Cj[:64] ⊕ X[:64]</textarea>
            <button id="kjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="FjContainer">
            <p>computed F<sub>j</sub></p>
            <textarea id="FjArea" disabled>display the computed Sj: &#xa Sj = Cj[:64] ⊕ X[:64]</textarea>
            <button id="FjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="RjContainer">
            <p>computed R<sub>j</sub></p>
            <textarea id="RjArea" disabled>display the computed Sj: &#xa Sj = Cj[:64] ⊕ X[:64]</textarea>
            <button id="RjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="WjContainer">
            <p>computed W<sub>j</sub></p>
            <textarea id="WjArea" disabled>display the computed Sj: &#xa Sj = Cj[:64] ⊕ X[:64]</textarea>
            <button id="WjButton" type="button" disabled>compute</button>
        </div>
        <!--footer row: finish-->
        <button class="cell" id="finish">Finish -></button>
    </div>

    <script>
        $('#finish').click(function() {
            $('#outmost4').replaceWith(welcome);
        })
    </script>
</div>`;

const welcome = `
<div id="outmostWelcome">
    <h1>Welcome to Searchable Encryption Visualization</h1>

    <div style="margin-left: 40px">
        <p>If you are new, start from the 'Intro' menu;</p>
        <p>If you know what you are doing, start from 'Scheme' menu</p>
    </div>
</div>`;