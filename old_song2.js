
// =========================================
// ............... functions ...............
// =========================================

const writeFileArea2 = (plains) => {
    let fileNames = Object.keys(plains);
    // populate fileList
    let fileList = $('#fileList');
    fileNames.forEach(fn => {
        fileList.append(`<li>${fn}</li>`);
    })
    // consistent behavior with the 1st page
    $('ul li').click( function() {
        // add or rm selected class
        $('ul li').removeClass('selected');
        $(this).addClass('selected');

        // populate pre-encrypted area
        let selectedFileName = $(this).html();
        let Xi = Xis_stream[selectedFileName];
        $('#XjContainer').html(Xi.toString('hex'));

        // if other 4 fields has data, populate them as well
        // TODO
    })

    // make the first file selected
    $('ul li').first().click();
}

// ==============================================
// ............... event handlers ...............
// ==============================================

// transition from 1st page to 2nd page
// everything in the 2nd page happens after the click of `#next1`
// analogous to $(document).ready(...)
$('#next1').click(function() {
    $('#song1').replaceWith(song2);

    writeFileArea2(plains);

    // TODO: when hover, there should be a tooltip showing the key for each primitives
    $('.xs.block').hover(function() {
        $(this).addClass('highlight');
    }, function () {
        $(this).removeClass('highlight');
    })

    $('#SiButton').click()
})







