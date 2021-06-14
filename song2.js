
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
        // populate Xj, Lj, Rj area
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
    })

    // make the first file selected
    $('#fileList li').first().click();
}

// ========================================
// ............... commands ...............
// ========================================

// split Xj into Lj and Rj
let result = computeLjsRjs(Xjs);
Ljs = result.Ljs;
Rjs = result.Rjs;

writeFileArea2(Xjs);

// ==============================================
// ............... event handlers ...............
// ==============================================

$('#kjButton').click(function() {
    kjs = computeKjs(Ljs);
    // populate kjArea with the key of selected file
    let fn = $('li.selected').html();
    $('#kjArea').html(displayBlocks(kjs[fn]));

    // enable Fj button if both kjs and Sjs are computed
    if (Object.keys(Sjs).length !== 0) {
        $('#FjButton').prop('disabled', false);
    }
})

$('#SjButton').click(function() {
    Sjs = genSis(Gs, Ljs);
    // populate SjArea with the pseudorandom blocks of selected file
    let fn = $('li.selected').html();
    $('#SjArea').html(displayBlocks(Sjs[fn]));

    // enable Fj button if both kjs and Sjs are computed
    if (Object.keys(kjs).length !== 0) {
        $('#FjButton').prop('disabled', false);
    }
})

$('#FjButton').click(function() {
    Fjs = computeFjs(kjs, Sjs);
    // populate FjArea with the Fj of selected file
    let fn = $('li.selected').html();
    $('#FjArea').html(displayBlocks(Fjs[fn]));

    // enable Cj button
    $('#CjButton').prop('disabled', false);
})

$('#CjButton').click(function() {
    Tjs = computeTjs(Sjs, Fjs);
    Cjs = computeCjs(Xjs, Tjs);
    // populate CjArea with the Cj of selected file
    let fn = $('li.selected').html();
    $('#CjArea').html(displayBlocks(Cjs[fn]));

    // show the next button
    $('#next2').removeAttr('hidden');
})