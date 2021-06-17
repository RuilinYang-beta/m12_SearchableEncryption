
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

// -------- hover effects of primitives and files --------
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
$('#searchTerm').hover(function () {
    $('#WjEnc').addClass('highlight');
}, function () {
    $('#WjEnc').removeClass('highlight');
})

$('#queryTerm').hover(function () {
    $('#XjEnc, #LjEnc, #kjEnc').addClass('highlight');
}, function () {
    $('#XjEnc, #LjEnc, #kjEnc').removeClass('highlight');
})
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
    $('#receivedTerm').hover(function () {
        $('#XSearch, #kSearch').addClass('highlight');
    }, function () {
        $('#XSearch, #kSearch').removeClass('highlight');
    })

    $('#CjContainer').hover(function () {
        $('#CjSearch').addClass('highlight');
    }, function () {
        $('#CjSearch').removeClass('highlight');
    })

    $('#bSjContainer').hover(function () {
        $('#SjSearch').addClass('highlight');
    }, function () {
        $('#SjSearch').removeClass('highlight');
    })

    $('#bFjContainer').hover(function () {
        $('#FjSearch').addClass('highlight');
    }, function () {
        $('#FjSearch').removeClass('highlight');
    })

    $('#bComputedFjContainer').hover(function () {
        $('#FjSearch_comp').addClass('highlight');
    }, function () {
        $('#FjSearch_comp').removeClass('highlight');
    })

    $('#isEqualContainer').hover(function () {
        $('#q1Search, #q2Search').addClass('highlight');
    }, function () {
        $('#q1Search, #q2Search').removeClass('highlight');
    })

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
                        $('#coverAll').fadeOut(450);
                        $("#coverAlice").show();   // cover alice
                        $('#coverBob').hide();     // show bob
                        writeFileArea3(plains);    // bob can see files
                    })
                });
            });
        });
    } else {
        $("#coverAlice").fadeIn(450);   // cover alice
        $('#coverBob').fadeOut(450);     // show bob
        writeFileArea3(plains);    // bob can see files
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
        // show alice, cover bob
        $("#coverAlice").hide();
        $('#coverBob').show();
        // clean the floor
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
