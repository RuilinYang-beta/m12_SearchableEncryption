
// ================================================
// ............... helper functions ...............
// ================================================

const writeFileArea3 = (plains) => {
    // populate fileList
    let fileNames = Object.keys(plains);
    for (let i = 0; i < fileNames.length; i++) {
        // hide filename as a class in <li>
        $('#fileList').append(`<li data-filename="${fileNames[i]}">Alice'sFile${i}</li>`);
    }

    $('#fileList li').click( function() {
        // add or rm selected class
        $('#fileList li').removeClass('selected');
        $(this).addClass('selected');

        let fn = $(this).data("filename");
        // populate CjEnc area
        $('#CjArea').html(displayBlocks(Cjs[fn]));

        // // populate other if it exists
        if (bSjs[fn] !== undefined) {
            $('#bSjArea').html(displayBlocks(bSjs[fn]));
        }
        if (bFjs[fn] !== undefined) {
            $('#bFjArea').html(displayBlocks(bFjs[fn]));
        }
        if (bFjs_comp[fn] !== undefined) {
            $('#bComputedFjArea').html(displayBlocks(bFjs_comp[fn]));
        }
        if (isEqual[fn] !== undefined) {
            $('#isEqualArea').html(displayBlocks(isEqual[fn]));
            // TODO: compute and populate toReturn on the fly
            $('#toReturnArea').html("" + isEqual[fn].some(isTrue));
        }
    })
    // make the first file selected
    $('#fileList li').first().click();
}

const isTrue = (e) => e;


// ========================================
// ............... commands ...............
// ========================================




// ==============================================
// ............... event handlers ...............
// ==============================================

$('#searchTermButton').click(function() {
    let searchTerm = Buffer.from($('#searchTermInput').val());
    if (searchTerm.length !== 16) {
        $('#searchTermNotice').html('Please enter exactly one block (128 bits / 16 English characters).');
        return;
    }
    // write query terms
    let X = E.encrypt(searchTerm, false).Xj[0];
    let L = X.slice(0, 8);
    let k = f.encrypt(L);
    $('#X').val(X.toString('hex'));
    $('#L').val(L.toString('hex'));
    $('#k').val(k.toString('hex'));
    // enable search
    $('#queryTermButton').prop('disabled', false);
})

$('#queryTermButton').click(function() {
    // cover Alice area, write file area, uncover Bob area
    $("#coverAlice").fadeIn(450);
    writeFileArea3(plains);
    $('#coverBob').fadeOut(450);

    // TODO: an animation that query terms flow to Bob

    // write query term to Bob
    $('#receivedX').val($('#X').val());
    $('#receivedk').val($('#k').val());
})

$('#bSjButton').click(function() {
    let X = Buffer.from($('#receivedX').val(), 'hex');
    bSjs = computebSjs(Cjs, X);
    // populate bSjArea with the bSj of selected file
    let fn = $('li.selected').data("filename");
    $('#bSjArea').html(displayBlocks(bSjs[fn]));
    // enable bComputedFjButton
    $('#bComputedFjButton').prop('disabled', false);
})

$('#bFjButton').click(function() {
    let X = Buffer.from($('#receivedX').val(), 'hex');
    bFjs = computebFjs(Cjs, X);
    // populate bFjArea with the bFj of selected file
    let fn = $('li.selected').data("filename");
    $('#bFjArea').html(displayBlocks(bFjs[fn]));
    // enable isEqualButton if both bFjs and bFjs_comp are computed
    if (Object.keys(bFjs_comp).length !== 0) {
        $('#isEqualButton').prop('disabled', false);
    }
})

$('#bComputedFjButton').click(function() {
    let k = Buffer.from($('#receivedk').val(), 'hex');
    bFjs_comp = computebComputedFjs(bSjs, k);
    // populate bFjArea with the bFj of selected file
    let fn = $('li.selected').data("filename");
    $('#bComputedFjArea').html(displayBlocks(bFjs_comp[fn]));
    // enable isEqualButton if both bFjs and bFjs_comp are computed
    if (Object.keys(bFjs).length !== 0) {
        $('#isEqualButton').prop('disabled', false);
    }
})

$('#isEqualButton').click(function() {
    isEqual = compareFjs(bFjs, bFjs_comp);
    // populate isEqualArea with the isEqual of the selected file
    let fn = $('li.selected').data("filename");
    $('#isEqualArea').html(displayBlocks(isEqual[fn]));
    $('#toReturnArea').html("" + isEqual[fn].some(isTrue));
    // TODO: show the next button

    //

})

