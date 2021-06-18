
// ================================================
// ............... helper functions ...............
// ================================================

const writeFileArea2 = (Xjs) => {
    // populate fileList
    let fileNames = Object.keys(Xjs);
    fileNames.forEach(fn => {
        $('#fileList').append(`<li>${fn}</li>`);
    })

    // when a filename is clicked, populate all text areas as long as it has value
    $('#fileList li').click( function() {
        // add or rm selected class
        $('#fileList li').removeClass('selected');
        $(this).addClass('selected');

        let fn = $(this).html();
        // populate XjEnc, Lj, RjEnc area
        $('#XjArea').html(displayBlocks(Xjs[fn]));
        $('#LjArea').html(displayBlocks(Ljs[fn]));
        $('#RjArea').html(displayBlocks(Rjs[fn]));

        // populate other if it exists
        if (kjs[fn] !== undefined) {
            $('#kjArea').html(displayBlocks(kjs[fn]));
        }
        if (Sjs[fn] !== undefined) {
            $('#SjArea').html(displayBlocks(Sjs[fn]));
        }
        if (Fjs[fn] !== undefined) {
            $('#FjArea').html(displayBlocks(Fjs[fn]));
        }
        if (Cjs[fn] !== undefined) {
            $('#CjArea').html(displayBlocks(Cjs[fn]));
        }
        if (fnEncs[fn] !== undefined) {
            $('#fnEncArea').html(fnEncs[fn].toString('hex'));
        }
    })

    // make the first file selected
    $('#fileList li').first().click();
}

// ========================================
// ............... commands ...............
// ========================================

// split XjEnc into Lj and RjEnc
let result = computeLjsRjs(Xjs);
Ljs = result.Ljs;
Rjs = result.Rjs;

writeFileArea2(Xjs);


// ==============================================
// ............... event handlers ...............
// ==============================================

// pop up help page
$('#titleLine .help').click(function() {
    window.open(songHelp, null, 'minimizable=false')
})

// -------- hover effects of primitives and files --------
hoverFiles();
hoverPrimitives();

// ---------- hover effects of text areas ----------
hoverTextAreas('#XjContainer', '#XjEnc');
hoverTextAreas('#LjContainer', '#LjEnc');
hoverTextAreas('#RjContainer', '#RjEnc');
hoverTextAreas('#kjContainer', '#smallF, #kjEnc');
hoverTextAreas('#SjContainer', '#GiEnc, #SjEnc, #G');
hoverTextAreas('#FjContainer', '#bigF, #FjEnc');
hoverTextAreas('#CjContainer', '#CjEnc');
hoverTextAreas('#fnEncContainer','#fnEnc, #smallE');

// ---------- handle button clicks ----------
$('#kjButton').click(function() {
    kjs = computeKjs(Ljs);
    // populate kjArea with the key of selected file
    let fn = $('li.selected').html();
    $('#kjArea').html(displayBlocks(kjs[fn]));

    // enable FjEnc button if both kjs and Sjs are both computed
    if (Object.keys(Sjs).length !== 0) {
        $('#FjButton').prop('disabled', false);
    }
})

$('#SjButton').click(function() {
    Sjs = genSjs(Gs, Ljs);
    // populate SjArea with the pseudorandom blocks of selected file
    let fn = $('li.selected').html();
    $('#SjArea').html(displayBlocks(Sjs[fn]));

    // enable FjEnc button if both kjs and Sjs are computed
    if (Object.keys(kjs).length !== 0) {
        $('#FjButton').prop('disabled', false);
    }
})

$('#FjButton').click(function() {
    Fjs = computeFjs(kjs, Sjs);
    // populate FjArea with the FjEnc of selected file
    let fn = $('li.selected').html();
    $('#FjArea').html(displayBlocks(Fjs[fn]));

    // enable CjEnc button
    $('#CjButton').prop('disabled', false);
})

$('#CjButton').click(function() {
    Tjs = computeTjs(Sjs, Fjs);
    Cjs = computeCjs(Xjs, Tjs);
    // populate CjArea with the CjEnc of selected file
    let fn = $('li.selected').html();
    $('#CjArea').html(displayBlocks(Cjs[fn]));

    // enable the next button
    if (Object.keys(fnEncs).length !== 0) {
        $('#next2').prop('disabled', false);
    }
})

$('#fnEncButton').click(function() {
    fnEncs = encrypteFilenames(Xjs);
    // populate fnEncArea with the encrypted filename of selected file
    let fn = $('li.selected').html();
    $('#fnEncArea').html(fnEncs[fn].toString('hex'));
    // enable the next button
    if (Object.keys(Cjs).length !== 0) {
        $('#next2').prop('disabled', false);
    }
})

$('#next2').click(function() {
    if (toAnimate) {
        $('#coverAll').fadeIn(500, function() {
            $("#aliceFiles").animate({left: '730px'}, 1000, function() {
                // shou up hint
                $('#hintText').fadeIn(500, function() {
                    $('#coverAll').click(function() {
                        $('#outmost2').replaceWith(song3);
                    })
                });
            });
        });
    } else {
        $('#outmost2').replaceWith(song3);
    }
})