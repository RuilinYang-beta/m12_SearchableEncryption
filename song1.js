
// =========================================
// ............... functions ...............
// =========================================

// When user click "Choose Files", clear any existing traces of files.
function clearFileArea() {
    plains = {};  // clear any existing values
    let fileList = document.querySelector('#fileList');
    if (fileList.childElementCount !== 0){
        fileList.innerHTML = '';
        document.querySelector('#plainArea').innerHTML = 'display the plain text of the chosen file';
        document.querySelector('#hexArea').innerHTML = 'display the hex representation of the chosen file';
    }
}


// Takes the `plains` and populate a few areas on the page.
const writeFileArea = (plains) => {
    let fileNames = Object.keys(plains);
    // populate fileList
    let fileList = document.querySelector('#fileList');
    fileNames.forEach(fn => {
        let li = document.createElement('li');
        li.textContent = fn;
        fileList.appendChild(li);
    })


    $('ul li').click( function() {
        // add or rm selected class
        $('ul li').removeClass('selected');
        $(this).addClass('selected');

        // populate plain, hex area
        let selectedFileName = $(this).html();
        let plainContent = plains[selectedFileName];
        let hexContent = new Buffer.from(plainContent).toString('hex');
        $('#plainArea').html(plainContent);
        $('#hexArea').html(hexContent);

        // populate pre-encrypted area if it exists
        if (Xis_stream[selectedFileName] !== undefined) {
            let preEncContent = Xis_stream[selectedFileName];
            $('#XiArea').html(preEncContent.toString('hex'));
        }
    })

    // make the first file selected
    $('ul li').first().click();
}


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

// ==============================================
// ............... event handlers ...............
// ==============================================

// whenever "Choose Files" is clicked, areas display files are cleared
$('#fileInput').click( clearFileArea );

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
        // Values will be an array, each element is an obj representing a file
        // [{name:file1name, content:file1content}, {name:file2name, content:file2content}, ...]
        for (let ele of values) {
            plains[ele.name] = ele.content;
        }
        // `plains` is of format: {fileName: fileContent}
        writeFileArea(plains);
    });
}, false);


$('#confirmButton').click(function() {
    // check if files are chosen
    if ($('#fileList').children().length === 0){
        $('#passwordNotice').html('Please select a few files before confirm.');
        return ;
    }

    // init primitives
    let pswd = $('#password').val();
    if (pswd.length > 0) {
        initPrimitives(pswd);
        $('#passwordNotice').html('Password used to initialize primitives. <br>Hover on E, Gs, f, F to see their keys. Now you can pre encrypt.');
    }

    // TODO: when hover, there should be a tooltip showing the key for each primitives
    $('.xs.block').hover(function() {
        $(this).addClass('highlight');
    }, function () {
        $(this).removeClass('highlight');
    })

    // disable "choose files", "confirm", "password input"
    $('#fileInput').prop('disabled', true);
    $('#password').prop('disabled', true);
    $('#confirmButton').prop('disabled', true);

    // enable "pre encrypt"
    $('#XiButton').prop('disabled', false);
})


$('#XiButton').click( function () {
    // compute pre-encrypt cipher
    let result = computeXis(plains);
    Xis_stream = result.Xis_stream;
    Xis = result.Xis;

    // populate the pre-encrypted area with the cipher of the selected file
    let selectedFn = $('li.selected').html();
    $('#XiArea').html(Xis_stream[selectedFn].toString('hex'));

    // show up the "next" button
    $('#next1').removeAttr('hidden');
})

$('#plainContainer, #hexContainer').hover( function () {
    $('#Wi').addClass('highlight');
}, function () {
    $('#Wi').removeClass('highlight');
})

$('#XiContainer').hover(function () {
    $('#Wi, #Xi, #E').addClass('highlight');
}, function () {
    $('#Wi, #Xi, #E').removeClass('highlight');
})
