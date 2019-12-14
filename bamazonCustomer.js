const inq = require('inquirer');
const mysql = require('mysql');
const color = require('colors');

require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env['PASSWORD'],
    database: 'bamazon'
});
function start() {
    connection.connect(err => {
        if (err) throw err;
        console.log(`Connection thread: ${connection.threadId}`);
        seeItems();
    });
}

function seeItems() {
    connection.query('SELECT * FROM products', (err, res) => {
        if (err) throw new Error('No such table exists');
        console.table(res);
        main();
    });
}

function main() {
    inq.prompt({
        type: 'input',
        message: 'Which item would you like to purchase (please enter item_id)',
        name: 'getItem'
    }).then(res => {
        let item = res.getItem;
        connection.query('SELECT * FROM products WHERE ?', { item_id: item }, (err, resConnection) => {
            if (err) throw err;
            console.log('Item Chosen: ');
            if (resConnection.length === 0) {
                console.log('Sorry, cannot find that item, please try again.'.red);
                main();
            } else {
                console.table(resConnection);
                inq.prompt({
                    type: 'input',
                    message: 'How many would you like to purchase?',
                    name: 'num'
                }).then(res2 => {
                    let num = res2.num;
                    let quantity = resConnection[0].stock_quantity;
                    if (quantity >= num) {
                        let total = resConnection[0].price * num;
                        console.log('For: '.cyan + resConnection[0].product_name.yellow);
                        console.log('Number of items: '.cyan + num.yellow);
                        console.log('Total cost: '.cyan + total.toString().yellow);
                        connection.query('UPDATE products SET ? WHERE ?', [{ stock_quantity: quantity - num }, { item_id: item }], (err) => {
                            if (err) throw err;
                        });
                        end();
                    } else {
                        console.log('sorry, we do not have that many in stock.');
                        end();
                    }

                });
                //end();
                //connection.end();
            }
        });
    });
}

function end() {
    inq.prompt({
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Continue Shopping', 'Quit'],
        name: 'choice'
    }).then(res => {
        if (res.choice === 'Continue Shopping') {
            //connection.end();
            seeItems();
        } else {
            process.exit();
            connection.end();
        }
    });
}

start();
