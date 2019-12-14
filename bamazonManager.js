const mysql = require('mysql');
const inq = require('inquirer');

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
        console.log(`Connected on: ${connection.threadId}`);
        main();
        //connection.end();
    });
}

function main() {
    inq.prompt({
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'],
        name: 'choice'
    }).then(res => {
        if (res.choice === 'View Products for Sale') {
            viewProducts();
        }

    });
}

function viewProducts() {
    connection.query('SELECT * FROM products', (err, res) => {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
}



start();