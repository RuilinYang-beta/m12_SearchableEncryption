
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

console.log(`page2, toAnimate: ${toAnimate}`);

// ==============================================
// ............... event handlers ...............
// ==============================================

// -------- hover effects of primitives --------
$('#files').hover(function() {
    $('#fnEnc').addClass('highlight');
}, function () {
    $('#fnEnc').removeClass('highlight');
})
// TODO: when hover, there should be a tooltip showing the key for each primitives
$('.flex>.xs.block').hover(function() {
    $(this).addClass('highlight');
}, function () {
    $(this).removeClass('highlight');
})
// ---------- hover effects of text areas ----------
$('#XjContainer').hover(function () {
    $('#XjEnc').addClass('highlight');
}, function () {
    $('#XjEnc').removeClass('highlight');
})

$('#LjContainer').hover(function () {
    $('#LjEnc').addClass('highlight');
}, function () {
    $('#LjEnc').removeClass('highlight');
})

$('#RjContainer').hover(function () {
    $('#RjEnc').addClass('highlight');
}, function () {
    $('#RjEnc').removeClass('highlight');
})

$('#kjContainer').hover(function () {
    $('#smallF, #kjEnc').addClass('highlight');
}, function () {
    $('#smallF, #kjEnc').removeClass('highlight');
})

$('#SjContainer').hover(function () {
    $('#GiEnc, #SjEnc, #G').addClass('highlight');
}, function () {
    $('#GiEnc, #SjEnc, #G').removeClass('highlight');
})

$('#FjContainer').hover(function () {
    $('#bigF, #FjEnc').addClass('highlight');
}, function () {
    $('#bigF, #FjEnc').removeClass('highlight');
})

$('#CjContainer').hover(function () {
    $('#CjEnc').addClass('highlight');
}, function () {
    $('#CjEnc').removeClass('highlight');
})

$('#fnEncContainer').hover(function () {
    $('#fnEnc, #smallE').addClass('highlight');
}, function () {
    $('#fnEnc, #smallE').removeClass('highlight');
})

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
                $('#hintText').fadeIn(1000, function() {
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