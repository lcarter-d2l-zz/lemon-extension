const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Functions to run
// npm install xlsx
// node translations/app.js
// Assumed path is root ->  D:\Alex\lemon-extension>

if (require.main === module){
    translateSheet('sample_data/translations.xlsx', 'sample_data/english.js', '_es');
}

/* Main Functions */
/*
Find and replace content in text file (.js, .txt, .html, etc) based on data in an excel sheet

Output a file with replaced strings relative to the original file. 
Any missed finds are returned to terminal in an array and to .json file

Parameters
sheetName: the sheet file name and path with extension, "example.xlsx"
fileName: the file name and path with extension to replace, "data/english.js"
proFix: string to add at end of updated file name, "_es"
*/
function translateSheet(sheetName, fileName, postFix){

    let json = parseXLSX(path.join(__dirname, sheetName), 0)
    let skipped = []

    fs.readFile(path.join(__dirname, fileName), 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }

        json.forEach(function (row){
            let regex = new RegExp(row.English.trim(),"g");
            if (data.match(regex) != null){
                data = data.replace( regex , row.Spanish.trim());
            }else{

                skipped.push(row.English.trim())
            }
            
        })
        
        const nameArray = fileName.split(".");
        let newFile = nameArray[0] + postFix + "." + nameArray[1];
        
        fs.writeFile(path.join(__dirname, newFile), data, 'utf8', function (err) {
           if (err) return console.log(err);
        });

        console.log("The following English could not be found: ");
        console.log(skipped);

        fs.writeFile(path.join(__dirname, "skipped.json"), JSON.stringify(skipped), 'utf8', function (err) {
            if (err) return console.log(err);
         });

    });

    

}



/* Secondary Functions */
function parseXLSX(file, sheetNum){
    let workbook = xlsx.readFile(file);
    let sheet = workbook.Sheets[workbook.SheetNames[sheetNum]]
    let json = xlsx.utils.sheet_to_json(sheet)
    return json
}