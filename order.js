const readline = require("readline/promises");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function Order(tableID, menuId, quantity) {
    this.tableID = tableID;
    this.menuId = menuId;
    this.quantity = quantity;
}

async function subSystem1(){

    const menuQuantity = await rl.question("");

    const menuStock = {};

    for (let i = 0; i < menuQuantity; i++)
    {
        const menuString = await rl.question("");
        const menu = menuString.split(" ");
        const menuId = menu[0];
        menuStock[menuId] = menu[1];
    }

    const orderStack = []; 
    
    let orderString;
    while(true){
        orderString = await rl.question("");
        if(!orderString) break;

        const order = orderString.split(" ");
        orderStack.push(new Order(order[1], order[2], order[3]))
    }

    orderStack.forEach((order) => {
        if(menuStock[order.menuId] >= order.quantity){
            menuStock[order.menuId] -= order.quantity;
            for (let i = 0; i < order.quantity; i++) console.log(`received order ${order.tableID} ${order.menuId}`);
        }
        else {
            console.log(`sold out ${order.tableID}`);
        }
    });

    rl.close();
}

module.exports = subSystem1;