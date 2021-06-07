// an obj mapping from file name to plain text content of the file
let plains = {};

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

// Handle multiple file uploads
document.getElementById("fileinput").addEventListener("change", function(ev){
    let files = ev.currentTarget.files;
    let readers = [];

    // Abort if there were no files selected
    if(!files.length) return;

    // Store promises in array
    for(let i = 0;i < files.length;i++){
        console.log(files[i].name);
        let content = readFileAsText(files[i]);

        readers.push(content);
    }

    // Trigger Promises
    Promise.all(readers).then((values) => {
        // Values will be an array, each element is an obj representing a file
        // [{name:file1name, content:file1content}, {name:file2name, content:file2content}, ...]
        // console.log(values);
        for (let ele of values) {
            plains[ele.name] = ele.content;
        }
        // `plains` is of format: {fileName: fileContent}
        console.log(plains);
    });
}, false);