var stamp = require(".");

function aSync1(callback) {
    setTimeout(function () { 
        aSync2(function(err)
               {
                   if(stamp(err)) {
                       callback(err);
                       return;
                   }   

                   console.log("aSync2 finished");
                   callback();
               });
    }, 0);
}

function aSync2(callback) {
    setTimeout(function () { 
        aSyncLast(function(err)
                  {
                      if(stamp(err)) {
                          callback(err);
                          return;
                      }   

                      console.log("aSyncLast finished");
                      callback();
                  });
    }, 0);
}

function aSyncLast(callback) {
    setTimeout(function(){
        callback(new Error());
    }, 0);
}

// init 
aSync1(function(err){
    if(err){
        throw err;
    }  

    console.log("aSync1 finished");
});
