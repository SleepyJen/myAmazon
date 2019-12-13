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

connection.connect(err => {
    if (err) throw err;
    console.log(`Connection thread: ${connection.threadId}`);
    seeItems();
    //connection.end();
});

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
        connection.query('SELECT * FROM products WHERE ?', { item_id: item }, (err, res) => {
            if (err) throw err;
            console.log('Item Chosen: ');
            if (res.length === 0) {
                console.log('Sorry, cannot find that item, please try again.'.red);
                main();
            } else {
                console.log('was successfull');
                console.table(res);
                inq.prompt({
                    type: 'input',
                    message: 'How many would you like to purchase?',
                    name: 'num'
                }).then(res => {
                    console.log(res.num);
                });
                connection.end();
            }
        });
    });
}

