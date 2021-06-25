
// ================================================
// ............... helper functions ...............
// ================================================

let writeFileArea3 = (plains) => {
    // populate fileList
    let fileNames = Object.keys(plains);
    for (let i = 0; i < fileNames.length; i++) {
        // hide filename as a data field in <li>
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


// ==============================================
// ............... event handlers ...............
// ==============================================

// pop up help page
$('#titleLine .help').click(function() {
    window.open(songHelp3, null, 'minimizable=false')
})

// -------- hover effects of primitives and files --------
hoverFiles();
hoverPrimitives();
// ---------- hover effects of text areas ----------
hoverTextAreas('#searchTerm', '#WjEnc');
hoverTextAreas('#queryTerm', '#XjEnc, #LjEnc, #kjEnc');
// ---------- handle button clicks ----------
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
    // ---------- hover effects of text areas ----------
    hoverTextAreas('#receivedTerm', '#XSearch, #kSearch');
    hoverTextAreas('#CjContainer', '#CjSearch');
    hoverTextAreas('#bSjContainer', '#SjSearch');
    hoverTextAreas('#bFjContainer', '#FjSearch');
    hoverTextAreas('#bComputedFjContainer', '#FjSearch_comp');
    hoverTextAreas('#isEqualContainer', '#q2Search');
})

$('#queryTermButton').click(function() {
    if (toAnimate) {
        // cover all area, show animation
        // when cover faded, show bob area, cover alice area
        $('#coverAll').fadeIn(500, function() {
            $("#aliceFiles").animate({left: '780px'}, 1000, function() {
                // show up hint
                $('#hintText').fadeIn(500, function() {
                    $('#coverAll').click(function() {
                        $('#coverAll').fadeOut(450, function() {
                            // cover alice
                            $("#coverAlice").show();
                            // show bob
                            $('#coverBob').hide(function() {
                                // bob can see files
                                writeFileArea3(plains);
                            });
                        });
                    })
                });
            });
        });
    } else {
        // cover alice
        $("#coverAlice").fadeIn(450);
        // show bob
        $('#coverBob').fadeOut(450, function() {
            // bob can see files
            writeFileArea3(plains);
        });
    }

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
    // enable the next button
    $('#next3').prop('disabled', false);
})


$('#next3').click(function() {
    let matchFound = false;
    for (let fn in isEqual) {
        if (isEqual[fn].some(isTrue)){
            matchFound = true;
            break;
        }
    }

    if (!matchFound) {
        // -- weird thing about Electron, if I use an alert here,
        // -- it takes > 10s before I can enter another search word.
        // clean bob's area, files, and cover bob area
        bSjs = {};
        bFjs = {};
        bFjs_comp = {};
        isEqual = {};
        $('#CjArea').html('the cipher blocks for the chosen file');
        $('#bSjArea').html('the recovered Sj: &#xa Sj = Cj[:64] ⊕ X[:64]');
        $('#bFjArea').html('the recovered Fj: &#xa Fj = Cj[64:] ⊕ X[64:] ');
        $('#bComputedFjArea').html('the computed Fj: &#xa Fj = F(k, Sj) &#xa (Bob knows how to construct an F)');
        $('#isEqualArea').html('is computed Fj equal to actual Fj for each block? ');
        $('#toReturnArea').html('should I (Bob, the server) return this file to Alice?');
        $('#fileList').empty();
        $('#coverBob').show();
        // show alice, clean alice's area
        $("#coverAlice").hide();
        $('#queryTermButton').prop('disabled', true);
        $('#searchTermInput').focus();
        // tell user to choose another word
        $('#searchTermNotice').html('No file matches. Please enter another word or start all over again.')
        return;
    }

    if (toAnimate) {
        $('#coverAll2').fadeIn(500, function() {
            $("#aliceFiles2").animate({left: '80px'}, 1000, function() {
                // show up hint
                $('#hintText2').fadeIn(500, function() {
                    $('#coverAll2').click(function() {
                        $('#outmost3').replaceWith(song4);
                    })
                });
            });
        });
    } else {
        $('#outmost3').replaceWith(song4);
    }
})
