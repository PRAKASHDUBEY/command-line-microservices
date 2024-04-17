const readline = require("readline/promises");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

(async ()=> {
    
    const index = await rl.question("");
    rl.close();
    
    if(index == 1) await require("./order")();
        
    else if(index == 2) await require("./cook")();

    else if(index == 3) await require("./serve")();

    else if(index == 4) await require("./checkout")();
})();
