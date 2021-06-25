
// ================================================
// ............... helper functions ...............
// ================================================

const writeFileArea4 = (Cjs, isEqual) => {
    // populate fileList
    let fileNames = Object.keys(Cjs);
    for (let i = 0; i < fileNames.length; i++) {
        // hide filename as a data field in <li>
        let fn = fileNames[i];
        if (isEqual[fn].some(isTrue)) {
            $('#fileList').append(`<li data-filename="${e.decrypt(fnEncs[fn]).toString().trim()}">
                                   returnedFile${i}
                               </li>`);
        }
    }

    $('#fileList li').click( function() {
        // add or rm selected class
        $('#fileList li').removeClass('selected');
        $(this).addClass('selected');

        let fn = $(this).data("filename");
        // populate CjEnc area
        $('#CjArea').html(displayBlocks(Cjs[fn]));

        // populate other if it exists
        if (SjsDec[fn] !== undefined) { $('#SjArea').html(displayBlocks(SjsDec[fn])); }
        if (LjsDec[fn] !== undefined) { $('#LjArea').html(displayBlocks(LjsDec[fn])); }
        if (kjsDec[fn] !== undefined) { $('#kjArea').html(displayBlocks(kjsDec[fn])); }
        if (FjsDec[fn] !== undefined) { $('#FjArea').html(displayBlocks(FjsDec[fn])); }
        if (RjsDec[fn] !== undefined) { $('#RjArea').html(displayBlocks(RjsDec[fn])); }
        if (WjsDec[fn] !== undefined) { $('#WjArea').html(displayBlocks(WjsDec[fn], 'utf-8')); }
    })

    // make the first file selected
    $('#fileList li').first().click();
}


// ========================================
// ............... commands ...............
// ========================================
writeFileArea4(Cjs, isEqual);

$('#imgEnc').css('background-color', '#dddddd');

// ==============================================
// ............... event handlers ...............
// ==============================================

// pop up help page
$('#titleLine .help').click(function() {
    window.open(songHelp4, null, 'minimizable=false')
})

// -------- hover effects of primitives and files --------
hoverFiles();
hoverPrimitives();
// ---------- hover effects of text areas ----------
hoverTextAreas('#CjContainer', '#CjDec');
hoverTextAreas('#fnDecButton', '#fnDec, #smallE');
hoverTextAreas('#SjContainer', '#GiDec, #SjDec, #G');
hoverTextAreas('#LjContainer', '#LjDec');
hoverTextAreas('#kjContainer', '#kjDec, #smallF');
hoverTextAreas('#FjContainer', '#FjDec, #bigF');
hoverTextAreas('#RjContainer', '#RjDec');
hoverTextAreas('#WjContainer', '#XjDec, #WjDec, #bigE');
// ---------- handle button clicks ----------
$('#fnDecButton>button').click(function() {
    $('#fileList li').each(function() {
        let fn = $(this).data("filename");
        $(this).html(fn);
    })
    $('#filenameNotice').html('filenames are decrypted.');
    // enable compute Sj
    $('#SjButton').attr('disabled', false);
})

$('#SjButton').click(function () {
    let filenames = $('#fileList li').map(function() {
        return $(this).html();
    })
    SjsDec = genSjsDec(Cjs, filenames, Gs);
    // populate SjArea with the SjDec of selected file
    let fn = $('li.selected').html();
    $('#SjArea').html(displayBlocks(SjsDec[fn]));
    // enable compute Lj
    $('#LjButton').attr('disabled', false);
})

$('#LjButton').click(function () {
    LjsDec = computeLjsDec(Cjs, SjsDec);
    // populate LjArea with the SjDec of selected file
    let fn = $('li.selected').html();
    $('#LjArea').html(displayBlocks(LjsDec[fn]));
    // enable compute Lj
    $('#kjButton').attr('disabled', false);
})

$('#kjButton').click(function() {
    kjsDec = computeKjs(LjsDec);
    // populate kjArea with the kjsDec of selected file
    let fn = $('li.selected').html();
    $('#kjArea').html(displayBlocks(kjsDec[fn]));
    // enable compute Fj
    $('#FjButton').attr('disabled', false);
})

$('#FjButton').click(function() {
    FjsDec = computeFjs(kjsDec, SjsDec);
    // populate kjArea with the kjsDec of selected file
    let fn = $('li.selected').html();
    $('#FjArea').html(displayBlocks(FjsDec[fn]));
    // enable compute Fj
    $('#RjButton').attr('disabled', false);
})

$('#RjButton').click(function () {
    RjsDec = computeRjsDec(Cjs, FjsDec);
    // populate RjArea with the RjDec of selected file
    let fn = $('li.selected').html();
    $('#RjArea').html(displayBlocks(RjsDec[fn]));
    // enable compute Wj
    $('#WjButton').attr('disabled', false);
})

$('#WjButton').click(function () {
    WjsDec = computeWjsDec(LjsDec, RjsDec);
    // populate WjArea with the WjDec of selected file
    let fn = $('li.selected').html();
    $('#WjArea').html(displayBlocks(WjsDec[fn], 'utf-8'));
    // enable finish
    $('#finish').attr('disabled', false);
})

$('#finish').click(function() {
    // $('#outmost4').replaceWith(welcome);
    $('#outmost4').fadeOut(450, function() {
        $('#outmost4').replaceWith(welcome);
    })
})
