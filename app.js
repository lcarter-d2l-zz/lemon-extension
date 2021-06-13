/*  Simple node app to read in .html files from a directory
    make small modifications to the file and save to another directory
    The same modification is done to every .html file

    To Use:
    1. Add any .html files to the directory 'original'
    2. Create a directory 'modified'
    3. Run in terminal with 'node app.js'
    4. All the modified .html will be saved directory 'modified' 

    All files in the 'modfied' with the same name will be written over

    Reference:
    - https://github.com/jsdom/jsdom

    Alex Mommersteeg
    2021-06-08
*/

const jsdom = require("jsdom");
const fs = require("fs");
const path = require('path');
const html = require("html");
const { JSDOM } = jsdom;

ORIGIN_DIR = "original";
MOD_DIR = "modified";


fs.readdir(path.join(__dirname, ORIGIN_DIR), function (err, files){

    if (err){
        return console.log('Unable to load directory: ' + err);
    }

    files.forEach(function (file){

        let filePath = path.join(__dirname, ORIGIN_DIR, file)
        fs.readFile(filePath, function (err, htmlDoc){

            if (err){
                return console.log('Unable to load file: ' + err);
            }
        
            let dom = new JSDOM(htmlDoc);
            let title = dom.window.document.querySelector('title').textContent;
            dom.window.document.querySelector('h1').textContent = title;


            let output = dom.serialize()
            let prettyOutput = html.prettyPrint(output, {indent_size: 2});
            fs.writeFile(path.join(__dirname, MOD_DIR, file), prettyOutput, function (err) {
                if (err){
                    return console.log('Unable to save file: ' + err);
                }
                console.log(file + ' Saved!');
            });
        })
    })

})

