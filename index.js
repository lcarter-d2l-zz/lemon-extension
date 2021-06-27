/*

This file contains the added methods and properties used to extend the required modules.
Along with a bunch of examples on how the modules can be used.

Reference:
- https://github.com/jsdom/jsdom
- https://github.com/taoqf/node-html-parser
*/

const fs = require('fs');
const path = require('path');
const HTMLParser = require('node-html-parser');
const {HTMLElement} = require('node-html-parser');
const HTML = require('html');
const xlsx = require('xlsx');


//*** Extending modules ***/
// Parse html file to HTMLElement
// parameters: path to the html file, include .html
// returns: HTMLElement
HTMLParser.loadFile = function (filePath){
    let file = fs.readFileSync(filePath);
    return HTMLParser.parse(file)
}

// Pretty prints html from HTMLElement
// parameters: N/A
// returns: String of HTMLElement
HTMLElement.prototype.prettyPrint = function(){
    return HTML.prettyPrint(this.outerHTML, {indent_size: 2})
}



//*** Examples ***/

//* Add load file and pretty print body html
// let filePath = path.join(__dirname, "/sample_data", "sample.html");
// let html = HTMLParser.loadFile(filePath);
// let body = html.querySelector('body');
// console.log(body.prettyPrint())

//* Read h1 tag and update title and create new html file (will overwrite files)
// let filePath = path.join(__dirname, "/sample_data", "sample.html");
// let html = HTMLParser.loadFile(filePath);
// let h1 = html.querySelector('body').querySelector('h1');
// html.querySelector('title').textContent = h1.textContent;
// fs.writeFileSync(path.join(__dirname, "/sample_data", "sample_new.html"), html.prettyPrint())

//* Add class to all p elements
// let filePath = path.join(__dirname, "/sample_data", "sample.html");
// let html = HTMLParser.loadFile(filePath);
// let elements = html.querySelectorAll('p');
// elements.forEach(element => {
//     element.classList.add("addClass");
// });
// console.log(html.prettyPrint())

//* Parse multiple files
// let files = fs.readdirSync(path.join(__dirname, "/sample_data"));
// files.forEach(file => {
//     let filePath = path.join(__dirname, "/sample_data", file);
//     if(path.extname(filePath) == ".html"){
//         let html = HTMLParser.loadFile(filePath);
//         console.log(html.prettyPrint())
//     }
// });

//* Modify and create multiple files
// let files = fs.readdirSync(path.join(__dirname, "/sample_data"));
// let updatedFiles = [];
// let skippedFiles = [];
// files.forEach(file => {
//     let filePath = path.join(__dirname, "/sample_data", file);
//     if(path.extname(filePath) == ".html"){
//         let html = HTMLParser.loadFile(filePath);
//         let h1 = html.querySelector('body').querySelector('h1');
//         html.querySelector('title').textContent = h1.textContent;
//         // create the ./sample_date/modified directory if it doesn't exist
//         if (!fs.existsSync(path.join(__dirname, "/sample_data", "modified"))){
//             fs.mkdirSync(path.join(__dirname, "/sample_data", "modified"))
//         }
//         fs.writeFileSync(path.join(__dirname, "/sample_data", "/modified", file), html.prettyPrint())
//         updatedFiles.push(file);
//     }else{
//         skippedFiles.push(file);
//     }
// });
// console.log("")
// console.log("The following files were updated:")
// console.log(updatedFiles);
// console.log("\n**********************\n");
// console.log("The following files were skipped:")
// console.log(skippedFiles);
// console.log("")

//* Modify multiple html files based on data from Excel sheet
// let excelFile = path.join(__dirname, "/sample_data", "sample_sheet.xlsx");
// let workbook = xlsx.readFile(excelFile);
// let sheet = workbook.Sheets[workbook.SheetNames[0]];
// let json = xlsx.utils.sheet_to_json(sheet);
// let files = fs.readdirSync(path.join(__dirname, "/sample_data"));
// files.forEach(file => {
//     let filePath = path.join(__dirname, "/sample_data", file);
//     if(path.extname(filePath) == ".html"){
//         let html = HTMLParser.loadFile(filePath);
//         let normTile = new String(html.querySelector('title').textContent).replace(/\s+/g, '').toLowerCase().normalize();
//         json.forEach( item => {
//             // If using filename as the selector, without file extension -> if(path.parse(file).name == item["File Selector"])
            
//             // Or by using html element, needs to normalize the selector
//             let normFileSelector = new String(item["File Selector"]).replace(/\s+/g, '').toLowerCase().normalize(); 
//             if(normTile == normFileSelector){
//                 elementSelector = item["Element Selector"];
//                 html.querySelector('video-js[data-account='+ elementSelector + ']').setAttribute('data-video-id',item["Updates"])
//             }
//         })
//         console.log(html.prettyPrint());
//     }
// })

//* Create HTMLElement add it to the body
// let filePath = path.join(__dirname, "/sample_data", "sample.html");
// let html = HTMLParser.loadFile(filePath);
// let body = html.querySelector('body');
// let div = new HTMLElement('div', {class: 'className'}, '');
// div.appendChild(new HTMLElement('p', '','')).textContent = "Hello World!!";
// body.appendChild(div)
// console.log(html.prettyPrint())