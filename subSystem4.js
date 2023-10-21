const readline = require("readline/promises");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

module.exports = async function subSystem4(){
    const menuQuantity = await rl.question("");

    const menuPrice = {};

    for (let i = 0; i < menuQuantity; i++)
    {
        const menuString = await rl.question("");
        const menu = menuString.split(" ");
        const menuId = menu[0];
        menuPrice[menuId] = Number(menu[2]);
    }

    const order = {};

    const logs = [];

    let orderString;
    while(true){
        orderString = await rl.question("");
        if(!orderString) break;
        
        const orderStatus = orderString.split(" ");
        if(orderStatus[0] == "received"){
            
            let tableId = orderStatus[2];
            let menuId = orderStatus[3];
            if(!order[tableId]) order[tableId] = {totalPrice:0, itemToServe:0}

            order[tableId].totalPrice += menuPrice[menuId];
            order[tableId].itemToServe += 1;
        }
        else if(orderStatus[0] == "ready"){
            let tableId = orderStatus[1];
            order[tableId].itemToServe -= 1;
        }
        else if(orderStatus[0] == "check"){
            let tableId = orderStatus[1];
            if(order[tableId].itemToServe > 0) logs.push(`please wait`);
            else {
                logs.push(order[tableId].totalPrice);
                order[tableId].totalPrice = 0;
            }
        }
    }

    logs.forEach(val => {
        console.log(val);
    })
    rl.close();
}