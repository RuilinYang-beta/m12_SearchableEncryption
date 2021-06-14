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
        <!-- 1st row: Xj and img -->
        <div class="cell textContainer" id="XjContainer">
            <p>pre-encrypted blocks (X<sub>j</sub>)</p>
            <textarea id="XjArea" disabled>display the pre-encrypted blocks of the chosen file</textarea>
        </div>
        <div class="cell" id="img">
            <div id="imageContainer">
                <div id="imageTitle">operation on file i, block j:</div>
                <!--pre-encryption-->
                <div id="Wj" class="block">W<sub>j</sub></div>
                <div id="da1" class="block-trans arrowSmall">&darr;</div>
                <div id="Xj" class="block">X<sub>j</sub></div>
                <div id="la" class="block-trans arrowSmall">&swarr;</div>
                <div id="ra1" class="block-trans arrowSmall">&searr;</div>
                <!--xor terms-->
                <div id="Lj" class="block">L<sub>j</sub></div>
                <div id="Rj" class="block">R<sub>j</sub></div>
                <div id="Sj" class="block">S<sub>j</sub></div>
                <div id="Fj" class="block">F<sub>k<sub>j</sub></sub>(S<sub>j</sub>)</div>
                <div id="kj">where k<sub>j</sub> = f<sub>k'</sub>(L<sub>j</sub>)</div>
                <!--xor operators-->
                <div id="xad" class="block-trans arrow">&#10549;</div>
                <div id="xor" class="block-trans">&nbsp&nbsp&nbsp⊕</div>
                <div id="xau" class="block-trans arrow" style="">&#10548;</div>
                <!--cipher text-->
                <div id="Cj" class="block" >C<sub>j</sub></div>
                <div id="ra2" class="block-trans arrow" >&rarr;</div>
                <!--PRNG related-->
                <div id="fn" class="block-trans">filename i</div>
                <div id="da2" class="block-trans arrow">&darr;</div>
                <div id="Gi" class="block xs">G<sub>i</sub></div>
                <div id="ra3" class="block-trans arrow" >&rarr;</div>
            </div>
        </div>
        <!-- 2nd row: Lj, Rj and kj -->
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
        <!-- 3rd row: Sj, Fj and Cj -->
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
        <!-- 1st row: word, query term, img -->
        <!-- 1.1 word -->
        <div class="cell" id="word">
            <h3>Alice (you)</h3>
            <div id="chooseWord">
                <label>Enter (exactly) a block to search, the server will return all the documents containing this term.</label>
                <br>
                <input id="wordInput" required>
            </div>
            <button id="confirmButton" type="button" >Confirm</button>
            <p id="wordNotice"></p>
        </div>
        <!-- 1.2 query term -->
        <div class="cell" id="queryTerm">
            This cell is used to show the computed X and k to send to the server.
        </div>
        <!-- 1.3 img -->
        <div class="cell" id="img">
            <div id="imageContainer">
                <div id="imageTitle">operation on file i, block j:</div>
                <!--pre-encryption-->
                <div id="Wj" class="block">W<sub>j</sub></div>
                <div id="da1" class="block-trans arrowSmall">&darr;</div>
                <div id="Xj" class="block">X<sub>j</sub></div>
                <div id="la" class="block-trans arrowSmall">&swarr;</div>
                <div id="ra1" class="block-trans arrowSmall">&searr;</div>
                <!--xor terms-->
                <div id="Lj" class="block">L<sub>j</sub></div>
                <div id="Rj" class="block">R<sub>j</sub></div>
                <div id="Sj" class="block">S<sub>j</sub></div>
                <div id="Fj" class="block">F<sub>k<sub>j</sub></sub>(S<sub>j</sub>)</div>
                <div id="kj">where k<sub>j</sub> = f<sub>k'</sub>(L<sub>j</sub>)</div>
                <!--xor operators-->
                <div id="xad" class="block-trans arrow">&#10549;</div>
                <div id="xor" class="block-trans">&nbsp&nbsp&nbsp⊕</div>
                <div id="xau" class="block-trans arrow" style="">&#10548;</div>
                <!--cipher text-->
                <div id="Cj" class="block" >C<sub>j</sub></div>
                <div id="ra2" class="block-trans arrow" >&rarr;</div>
                <!--PRNG related-->
                <div id="fn" class="block-trans">filename i</div>
                <div id="da2" class="block-trans arrow">&darr;</div>
                <div id="Gi" class="block xs">G<sub>i</sub></div>
                <div id="ra3" class="block-trans arrow" >&rarr;</div>
            </div>
        </div>

        <!-- 2nd row: received, Cj, Sj, img_search -->
        <div class="cell" id="receivedTerm">
            <h3>Bob (cloud server) </h3>
            This cell is used to show the received X and k, with hover -> highlight image_search effect.
        </div>
        <div class="cell textContainer" id="CjContainer">
            <p>cipher blocks(C<sub>j</sub>)</p>
            <textarea id="CjArea" disabled>display the cipher blocks for the chosen file</textarea>
        </div>
        <div class="cell textContainer" id="SjContainer">
            <p>computed S<sub>j</sub></p>
            <textarea id="SjArea" disabled>display the computed Sj: &#xa Sj = Cj[:64] ⊕ X[:64]</textarea>
            <button id="SjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell" id="img_search">to put a simple image here, showing how Bob will deal with each block</div>
        <!-- 3rd row: computedFj, actualFj, isEqual, toReturn -->
        <div class="cell textContainer" id="computedFjContainer">
            <p>computed F<sub>j</sub></p>
            <textarea id="computedFjArea" disabled>display the computed Fj: &#xa Fj = F(k, Sj)</textarea>
            <button id="computedFjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="actualFjContainer">
            <p>actual F<sub>j</sub></p>
            <textarea id="actualFjArea" disabled>display the actual Fj: &#xa Fj = Cj[64:] ⊕ X[64] </textarea>
            <button id="actualFjButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="isEqualContainer">
            <p>isEqual?</p>
            <textarea id="isEqualArea" disabled>is computed Fj equal to actual Fj for each block? </textarea>
            <button id="isEqualButton" type="button" disabled>compute</button>
        </div>
        <div class="cell textContainer" id="toReturnContainer">
            <p>toReturn?</p>
            <textarea id="toReturnArea" disabled>should I (Bob, the server) return the file to Alice?</textarea>
            <button id="toReturnButton" type="button" disabled>compute</button>
        </div>
        <!--footer row: next-->
        <button class="cell" id="next3">Next -></button>
    </div>
    <script>
        $('#next3').click(function() {
            $('#outmost3').replaceWith(song4);
        })
    </script>
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
        <!-- 1st row: Cj, filename, img -->
        <!-- 1.1 Cj -->
        <div class="cell textContainer" id="CjContainer">
            <p>cipher blocks(C<sub>j</sub>)</p>
            <textarea id="CjArea" disabled>display the cipher blocks for the chosen file</textarea>
        </div>
        <!-- 1.2 filename -->
        <div class="cell" id="filename">a button to decrypt all filenames (and change the file list)</div>
        <!-- 1.3 img -->
        <div class="cell" id="img">
            <div id="imageContainer">
                <div id="imageTitle">operation on file i, block j:</div>
                <!--pre-encryption-->
                <div id="Wj" class="block">W<sub>j</sub></div>
                <div id="da1" class="block-trans arrowSmall">&darr;</div>
                <div id="Xj" class="block">X<sub>j</sub></div>
                <div id="la" class="block-trans arrowSmall">&swarr;</div>
                <div id="ra1" class="block-trans arrowSmall">&searr;</div>
                <!--xor terms-->
                <div id="Lj" class="block">L<sub>j</sub></div>
                <div id="Rj" class="block">R<sub>j</sub></div>
                <div id="Sj" class="block">S<sub>j</sub></div>
                <div id="Fj" class="block">F<sub>k<sub>j</sub></sub>(S<sub>j</sub>)</div>
                <div id="kj">where k<sub>j</sub> = f<sub>k'</sub>(L<sub>j</sub>)</div>
                <!--xor operators-->
                <div id="xad" class="block-trans arrow">&#10549;</div>
                <div id="xor" class="block-trans">&nbsp&nbsp&nbsp⊕</div>
                <div id="xau" class="block-trans arrow" style="">&#10548;</div>
                <!--cipher text-->
                <div id="Cj" class="block" >C<sub>j</sub></div>
                <div id="ra2" class="block-trans arrow" >&rarr;</div>
                <!--PRNG related-->
                <div id="fn" class="block-trans">filename i</div>
                <div id="da2" class="block-trans arrow">&darr;</div>
                <div id="Gi" class="block xs">G<sub>i</sub></div>
                <div id="ra3" class="block-trans arrow" >&rarr;</div>
            </div>
        </div>
        <!-- 2nd row: Sj, Lj, img_dec -->
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
        <div class="cell" id="img_dec">a image to show the decryption process; parts highlightable</div>
        <!-- 3rd row: kj, Fj, Rj, Wj -->
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