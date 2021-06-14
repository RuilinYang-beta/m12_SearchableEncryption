
// ================================================
// ............... helper functions ...............
// ================================================

const writeFileArea3 = (plains) => {
    // populate fileList
    let fileNames = Object.keys(plains);
    fileNames.forEach(fn => {
        $('#fileList').append(`<li>${fn}</li>`);
    })

    // TODO: set the filelist looks like "disabled", click won't work
    // because Alice doesnt have access to them.
}

const handleClickFile = () => {
    $('#fileList li').click( function() {
        // add or rm selected class
        $('#fileList li').removeClass('selected');
        $(this).addClass('selected');

        let fn = $(this).html();
        // populate Cj area
        $('#CjArea').html(displayBlocks(Cjs[fn]));

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

writeFileArea3(plains);

// ==============================================
// ............... event handlers ...............
// ==============================================

$('#searchTermButton').click(function() {
    let searchTerm = $('#searchTermInput').val();
    if (searchTerm.length !== 16) {
        $('#searchTermNotice').html('Please enter exactly one block (16 characters).');
        return;
    }
    // write query terms
    let preX = E.encrypt(searchTerm, false);
    let X = preX.Xj[0];
    let L = X.slice(0, 8);
    let k = f.encrypt(L);
    $('#X').val(X.toString('hex'));
    $('#L').val(L.toString('hex'));
    $('#k').val(k.toString('hex'));
    // enable search
    $('#queryTermButton').prop('disabled', false);
})

$('#queryTermButton').click(function() {
    // TODO: blackout Alice Cells

    // TODO: an animation that query terms flow to Bob

    // write data to Bob
    $('#receivedX').val($('#X').val());
    $('#receivedk').val($('#k').val());
})

