
// ================================================
// ............... helper functions ...............
// ================================================

// When user click "Choose Files", clear any existing traces of files.
function clearFileArea() {
    plains = {};
    if ($('#fileList').children().length !== 0) {
        // clear file list
        $('#fileList').empty();
        // reset all text areas
        $('#plainArea').html('display the plain text of the chosen file');
        $('#plainBlockArea').html('display the plain text of the chosen file in 128-bit blocks, a 128-bit block is a Word');
        $('#WjArea').html('display the Words of the chosen file in hex encoding');
        $('#XjArea').html('display the pre-encrypted Words of the chosen file');
    }
}

// return a Promise to read a file
const readFileAsText = (file) => {
    return new Promise(function(resolve,reject){
        let fr = new FileReader();

        fr.readAsText(file);

        fr.onload = function(e){
            const result = {
                name: file.name,
                content: fr.result
            }
            // resolve(fr.result);
            resolve(result);
        };

        fr.onerror = function(){
            reject(fr);
        };
    });
}

// Takes the `plains` and populate a few areas on the page.
const writeFileArea = (plains, Wjs) => {
    // populate fileList
    let fileNames = Object.keys(plains);
    fileNames.forEach(fn => {
        $('#fileList').append(`<li>${fn}</li>`);
    })

    // when a filename is clicked, populate plains, plainBlocks, WjEnc area
    $('#fileList li').click( function() {
        // add or rm selected class
        $('#fileList li').removeClass('selected');
        $(this).addClass('selected');

        let fn = $(this).html();
        // populate plain area, WjEnc, and plainBlock area
        $('#plainArea').html(plains[fn]);
        let WjDisplay = '';
        let plainBlocksDisplay = '';
        for (let block of Wjs[fn]){
            WjDisplay += `[${block.toString('hex')}],`;
            plainBlocksDisplay += `[${block.toString()}],`;
        }
        $('#WjArea').html(WjDisplay);
        $('#plainBlockArea').html(plainBlocksDisplay);

        // populate pre-encrypted area if it exists
        if (Xjs_stream[fn] !== undefined) {
            $('#XjArea').html(displayBlocks(Xjs[fn]));
        }
    })

    // make the first file selected
    $('#fileList li').first().click();
}

// ========================================
// ............... commands ...............
// ========================================
$('#animation1').prop('checked', true);

// ==============================================
// ............... event handlers ...............
// ==============================================

// pop up help page
$('#titleLine .help').click(function() {
    window.open(songHelp, null, 'minimizable=false')
})


// Handle multiple file uploads
document.getElementById("fileInput").addEventListener("change", function(ev){
    let files = ev.currentTarget.files;
    let readers = [];

    // Abort if there were no files selected
    if(!files.length) return;

    // Store promises in array
    for(let i = 0;i < files.length;i++){
        let content = readFileAsText(files[i]);
        readers.push(content);
    }

    // Trigger Promises
    Promise.all(readers).then((values) => {
        // new data is ready, erase old data
        clearFileArea();
        // format of `value`: [ele, ele, ele, ..]
        // format of `ele`: {name:fileName, content:fileContent}
        for (let ele of values) {
            plains[ele.name] = ele.content;
        }
        Wjs = computeWjs(plains);

        writeFileArea(plains, Wjs);
    });
}, false);

$('#passwordButton').click(function() {
    // sanity: check if files are chosen
    if ($('#fileList').children().length === 0){
        $('#passwordNotice').html('Please select a few files before confirm.');
        return ;
    }
    // sanity: check if there's a password
    let pswd = $('#passwordInput').val();
    if (pswd.length === 0) {
        $('#passwordNotice').html('Password cannot be empty. Please try again');
        return;
    }

    // init primitives
    $('#passwordNotice').html('Wait a sec...');
    console.log('here');
    initPrimitives(pswd, Object.keys(plains));
    $('#passwordNotice').html('Primitives Initialized. <br>Hover on primitives and text areas to see what\'s there.');

    // disable "choose files", "confirm", "password input"
    $('#fileInput').prop('disabled', true);
    $('#passwordInput').prop('disabled', true);
    $('#confirmButton').prop('disabled', true);

    // enable "pre encrypt"
    $('#XjButton').prop('disabled', false);

    // --------- hover effects of primitives ---------
    hoverFiles();
    hoverPrimitives();
    // --------- hover effects of text areas ---------
    hoverTextAreas('#plainContainer, #plainBlockContainer, #WjContainer',
                '#WjEnc');
    hoverTextAreas('#XjContainer',
                '#WjEnc, #XjEnc, #bigE');
})

$('#XjButton').click( function () {
    // compute pre-encrypt cipher
    let result = computeXjs(plains);
    Xjs_stream = result.Xjs_stream;
    Xjs = result.Xjs;
    // populate the pre-encrypted area with the cipher of the selected file
    let fn = $('li.selected').html();
    $('#XjArea').html(displayBlocks(Xjs[fn]));
    // enable the next button
    $('#next1').prop('disabled', false);
})

$('#next1').click(function() {
    // update animation flag
    if ($('#animation1').prop('checked')){
        toAnimate = true;
    } else {
        toAnimate = false;
    }
    // change html
    $('#outmost1').replaceWith(song2);

})

