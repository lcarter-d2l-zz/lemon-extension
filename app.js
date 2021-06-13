/*  Simple node app to read in .html files from a directory
    make small modifications to the file and save to another directory
    The same modification is done to every .html file
    To Use:
    1. Add any .html files to the directory 'original'
    2. Update code with what function the should be run
    3. Run in terminal with 'node app.js'
    4. All the modified .html will be saved directory 'modified' 
    All files in the 'modfied' with the same name will be written over
    Reference:
    - https://github.com/jsdom/jsdom
    - https://github.com/sheetjs/sheetjs
    Alex Mommersteeg
    2021-06-13
*/

const jsdom = require('jsdom');
const fs = require('fs');
const path = require('path');
const html = require('html');
const xlsx = require('xlsx');
const { exit } = require('process');
const { JSDOM } = jsdom;


ORIGIN_DIR = "original";
MOD_DIR = "modified";

// Functions to run
if (require.main === module){

    /* Examples on how to use main functions */
    //updateAttribute("Sample Content Sheet.xlsx", "ASSET TITLE", "title", "VIDEO ID", "video-js", "data-video-id");
    //updateContent("title", "h1")
}

/* Main Functions */
/*
Update content in html file based on data in an excel sheet

To Use: Place the excel sheet in the to original directory with the html file

Parameters
sheetName: the sheet file name with extension, "example.xlsx"
uniqueKey: the header in the excel sheet with unique id to locate the html file
uniqueKeyTag: the tag in the html file to compare with the unique id
replaceKey: the header in the excel with the data to be added to the html file
replaceTag: the tag in the html file to update the content
replaceAtt: the attribute in the html file to be updated;
*/
function updateAttribute(sheetName, uniqueKey, uniqueKeyTag, replaceKey, replaceTag, replaceAtt){
    initApp();
    let json = parseXLSX(path.join(__dirname, ORIGIN_DIR, sheetName), 0)
    let updatedFiles = [];
    let skippedFiles = [];

    files = fs.readdirSync(path.join(__dirname, ORIGIN_DIR))
    
    files.forEach(function (file){

        let filePath = path.join(__dirname, ORIGIN_DIR, file)
        if(path.extname(filePath) == ".html"){
            doc = fs.readFileSync(filePath)
            data = findReplaceData(doc, json, uniqueKey, uniqueKeyTag, replaceKey)
            if (data){
                response = updateAttHTML(file, doc, replaceTag, replaceAtt, data);
                if (response){
                    updatedFiles.push(file);
                }else{
                    skippedFiles.push(file);
                }
            }else{
                skippedFiles.push(file);
            }
        }
    })
    console.log("The following files were updated:")
    console.log(updatedFiles);
    console.log("\n**********************\n");
    console.log("The following files were skipped:")
    console.log(skippedFiles);
}

/*
Update read content from html and add it to another location in the same file

To Use: Place the html files in the to original directory

Parameters
readTag: the tag in the html file to read the data
updateTag: the tag in the html file to update data
*/
function updateContent(readTag, updateTag){
    initApp();
    let updatedFiles = [];
    let skippedFiles = [];

    files = fs.readdirSync(path.join(__dirname, ORIGIN_DIR));
    files.forEach(function (file){
        let filePath = path.join(__dirname, ORIGIN_DIR, file)
        if(path.extname(filePath) == ".html"){
            data = readContentHTML(readTag, file);
            if(data){
                response = updateContentHTML(updateTag, data, file);
                if (response){
                    updatedFiles.push(file);
                }else{
                    skippedFiles.push(file);
                }
            }else{
                skippedFiles.push(file);
            }
        }
    })
    console.log("The following files were updated:")
    console.log(updatedFiles);
    console.log("\n**********************\n");
    console.log("The following files were skipped:")
    console.log(skippedFiles);
}

/* Secondary Functions */
function initApp(){
    if (!fs.existsSync(path.join(__dirname, MOD_DIR))){
        fs.mkdirSync(path.join(__dirname, MOD_DIR))
    }
    if (!fs.existsSync(path.join(__dirname, ORIGIN_DIR))){
        console.error("[ERROR] The original directory is missing")
        exit();
    }
}

function parseXLSX(file, sheetNum){
    let workbook = xlsx.readFile(file);
    let sheet = workbook.Sheets[workbook.SheetNames[sheetNum]]
    let json = xlsx.utils.sheet_to_json(sheet)
    return json
}

function findReplaceData(doc, json, key, tag, replaceKey){
    let dom = new JSDOM(doc);
    let selector = dom.window.document.querySelector(tag);
    let data = null;
    if(selector){
        let uniqueKey = new String(selector.textContent).replace(/\s+/g, '').toLowerCase().normalize();
        json.forEach(function(item){
            let uniqueTag = new String(item[key]).replace(/\s+/g, '').toLowerCase().normalize();
            if(uniqueKey == uniqueTag){
                data = item[replaceKey]
                return
            }
        })
    }
    return data
}

function updateAttHTML(file, doc, tag, att, data){
    let dom = new JSDOM(doc);
    console.log(tag)
    let selector = dom.window.document.querySelector(tag)

    if(selector){
        selector.setAttribute(att, data)
        let output = dom.serialize()
        let prettyOutput = html.prettyPrint(output, {indent_size: 2});
        fs.writeFileSync(path.join(__dirname, MOD_DIR, file), prettyOutput)
        return true
    }
    return false
}


function readContentHTML(tag, file){
    let filePath = path.join(__dirname, ORIGIN_DIR, file)
    let doc = fs.readFileSync(filePath);
    let dom = new JSDOM(doc);
    let selector = dom.window.document.querySelector(tag);
    if(selector){
        let data = selector.textContent;
        return data
    }else{
        return null
    }
}

function updateContentHTML(tag, data, file){
    let filePath = path.join(__dirname, ORIGIN_DIR, file)
    let doc = fs.readFileSync(filePath);
    let dom = new JSDOM(doc);
    let selector = dom.window.document.querySelector(tag);
    if(selector){
        selector.textContent = data;
        let output = dom.serialize()
        let prettyOutput = html.prettyPrint(output, {indent_size: 2});
        fs.writeFileSync(path.join(__dirname, MOD_DIR, file), prettyOutput)
        return true
    }else{
        return false
    }
}

