const readline = require("readline/promises");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function subSystem2(){
    const MKString = await rl.question("");
    const MK = MKString.split(" ");
    const menuQuantity = MK[0];
    let availableMicrowave = MK[1];

    for (let i = 0; i < menuQuantity; i++)
    {
        await rl.question("");
    }

    const cooking = {};

    const waiting = [];
    let waitingIndex = 0;

    const log = [];

    let orderString;
    while(true){
        orderString = await rl.question("");
        if(!orderString) break;

        const orderStatus = orderString.split(" ");
        if(orderStatus[0] == "received"){
            
            if(availableMicrowave){
                let menuId = orderStatus[3];
                if(!cooking[menuId]) cooking[menuId] = 0;
                cooking[menuId] += 1;
                availableMicrowave -= 1;
                log.push(orderStatus[3]);
            }
            else{
                waiting.push(orderStatus[3]);
                log.push("wait")
            }
        }
        else if(orderStatus[0] == "complete"){
            let invalid = true;
            let menuId = orderStatus[1];

            if(cooking[menuId]){
                cooking[menuId] -= 1;
                invalid = false;
                
                if(waiting.length > waitingIndex){
                    log.push(`ok ${waiting[waitingIndex]}`);
                    
                    menuId = waiting[waitingIndex];
                    waitingIndex++;

                    if(!cooking[menuId]) cooking[menuId] = 0;
                    cooking[menuId] += 1;
                }
                else{
                    ++availableMicrowave;
                    log.push("ok");
                }
            }
            
            if(invalid){
                log.push("unexpected input");
            }
        }
    }

    log.forEach(val => {
        console.log(val);
    })
    rl.close();
}

module.exports = subSystem2;