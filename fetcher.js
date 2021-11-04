const request = require('request');
const fs = require('fs')
const readline = require("readline");

const saveWebPage = function(web,file){
  request(web, (error, response, body) => {
    if (error) {
      console.log('An error occurred requesting the page :', error); // Print the error if one occurred
    } else {
      console.log('Page downloaded successfuly with a statusCode:', response && response.statusCode); // Print the response status code if a response was received
      //console.log('body:', body); // Print the HTML for the Google homepage.

      fs.exists(file, function (isExist) {
        if (isExist) {
          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          
          rl.question("File already exist would you like to overwrite (Y/N)? ", function(name) {
            if (name === "Y") {
              fs.writeFile(file, body, err => {
                if (err) {
                  console.error("An error occurred while writing the file :",err);
                } else {
                  console.log(`Downloaded and saved ${body.length} bytes to ${file}.`);
                }
              });    
            }
            rl.close();
          });        
        
        } else {

          fs.writeFile(file, body, err => {
            if (err) {
              console.error("An error occurred while writing the file :",err);
            } else {
              console.log(`Downloaded and saved ${body.length} bytes to ${file}.`);
            }
          });
        }
      });
    }
  });
}

if (process.argv.length !== 4) {
  console.log("Usage : node fetcher.js web file");
  console.log("        node fetcher.js http://www.google.com index.html");
} else {
  saveWebPage(process.argv[2],process.argv[3]);
}
