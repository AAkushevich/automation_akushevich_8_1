async function main() {

  if(process.argv.slice(2).length > 0) {
    await getArguments().then((arguments) => {
      findFiles(arguments[0], arguments[1], arguments[2])
      .then((fileNames) => {
        if(typeof arguments[2] == undefined) {
          fileNames.forEach(file => {
            console.log(file);
          })
        }
        else {
          for(i; i < arguments[2]; i++) {
            console.log(fileNames[i]);
          }
        }
      })
      .catch((pathToDirectory) => console.log("No such file or directory! ",pathToDirectory));  
    })
    .catch((errorMessage) => console.log(errorMessage));
  }
  else {
    console.log("Need to pass arguments. Usage: -e .txt -p /home/user/Documents -c 5");
    return;
  }
}

async function getArguments() {
  return new Promise(function(resolve, reject) {
    var arguments = new Array();
    if(process.argv.slice(2)[0] == "-e") {
      arguments.push(process.argv.slice(2)[1]);
    }
    else {
      reject("Argument -e not found");
      return;
    }
    if(process.argv.slice(2)[2] == "-p") {
      arguments.push(process.argv.slice(2)[3]);
    }
    else {
      reject("Argument -p not found");
      return;
    }
    if(process.argv.slice(2)[4] == "-c") {
      arguments.push(process.argv.slice(2)[5]);
    }
    resolve(arguments);
  });
}

var path = require('path'), fs=require('fs'), i = 0;

function findFiles(fileExtension, pathToDirectory, countFilesToPrint) {

  return new Promise(function(resolve, reject) {
    if (!fs.existsSync(pathToDirectory)){
        reject(pathToDirectory);
        return;
    }
    var findings = new Array();
    var unixTimeLastCreated;
    var files = fs.readdirSync(pathToDirectory);

    for(var j = 0; j < files.length; j++) {

        var filename = path.join(pathToDirectory, files[j]);
        var fileInfo = fs.lstatSync(filename);

        if (fileInfo.isDirectory()){
          findFiles(fileExtension, filename)
          .then((fileNames) => {
            if(typeof countFilesToPrint == undefined) {
              fileNames.forEach(file => {
                console.log(file);
              })
            }
            else {
              for(i; i < countFilesToPrint; i++) {
                console.log(fileNames[i]);
              }
            }
          });
      }
      else  if (filename.substr(-1 * (fileExtension.length)) == fileExtension) {

          if(findings.length == 0) {           
            findings.push(filename);
            unixTimeLastCreated = fileInfo.atimeMs;
          }
          else {
            if(Math.abs(unixTimeLastCreated - fileInfo.atimeMs) < 10000) { 
              findings.push(filename);
              if(fileInfo.atimeMs > unixTimeLastCreated){
                unixTimeLastCreated = fileInfo.atimeMs;
              }
            }
            else if(unixTimeLastCreated < fileInfo.atimeMs) {
              findings = [];
              findings.push(filename);
              unixTimeLastCreated = fileInfo.atimeMs;
            }
          }
        };
    }
    resolve(findings);
  });
};

main();
