
async function main() {

    callBackExample(function() {
      simpleAction()
    });

    promiseFunction()
    .then(
      result => console.log(result),
    ).catch(
      reason => console.error(reason)
    );

    let number = await asyncExample(10);
    console.log(number);

    combinePromiseCallback(10, function(number) {
      let promise  = new Promise(function(resolve, reject){
        if(number > 0) {
           resolve("Ok");
        }
        else {
           reject("Rejected!");
        }
      });
      promise.then(
        value => console.log(value)
      ).catch(
        value => console.log(value));
    });
  }
  

  function callBackExample(func) { //#1
    func();
  }
  
  function simpleAction() {
    console.log("Do something...")
  }

  function promiseFunction() {  //#2

    console.log("start");
    let promise  = new Promise(function(resolve, reject) {
      setTimeout(function(){
        Math.random() > .5 ? resolve("Success") : reject("Error!");
      }, 2000);
    });
 
    return promise;
  }

  async function asyncExample(number) { //#3
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(++number);
      }, 2000);
    });
  }

  function combinePromiseCallback(number, callBack) {

    let resultNumber = number - Math.random();
    callBack(resultNumber);
  }

  main();