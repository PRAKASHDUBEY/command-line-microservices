const readline = require("readline/promises");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

(async ()=> {
    
    const index = await rl.question("");
    rl.close();
    
    if(index == 1) await require("./subSystem1")();
        
    else if(index == 2) await require("./subSystem2")();

    else if(index == 3) await require("./subSystem3")();

    else if(index == 4) await require("./subSystem4")();
})();