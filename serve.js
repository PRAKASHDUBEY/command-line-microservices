const readline = require("readline/promises");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function subSystem3(){
    const menuQuantity = await rl.question("");

    for (let i = 0; i < menuQuantity; i++)
    {
        await rl.question("");
    }

    const order = {}; // menu -> {table Id  [], index}

    const logs = [];

    let orderString;
    while(true){
        orderString = await rl.question("");
        if(!orderString) break;
        
        const orderStatus = orderString.split(" ");
        if(orderStatus[0] == "received"){
            
            let menuId = orderStatus[3];
            if(!order[menuId]) order[menuId] = {tableID: [], index:0}
            order[menuId].tableID.push(orderStatus[2]);
        }
        else if(orderStatus[0] == "complete"){
            let menuId = orderStatus[1];
            let tableIndex = order[menuId].index;
            let tableId = order[menuId].tableID[tableIndex];
            order[menuId].index += 1;
            logs.push(`ready ${tableId} ${menuId}`);
        }
    }

    logs.forEach(val => {
        console.log(val);
    })
    rl.close();    
}

module.exports = subSystem3;