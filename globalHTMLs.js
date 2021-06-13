/**
 * This file contains the html strings for page 2, 3, 4.
 * Each of them will be used in $('sth').replaceWith(htmlString) at some point.
 * Note this is not a good practice, the purpose is to maintain the same variable state
 * (eg. after the first page, `plains` is non-empty) from being erased.
 *
 * If not using this approach, but load a song2.html after clicking `next` in song1.html,
 * song2.html will need to load globalVar.js to have access to `plains` etc, but this will erase
 * `plains` to its initial state (an empty obj)!!
 */

const song2 = `
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
        <div id="XiContainer">
            <p>pre-encrypted</p>
            <textarea id="XiArea" disabled>display the pre-encrypted cipher of the chosen file</textarea>
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
