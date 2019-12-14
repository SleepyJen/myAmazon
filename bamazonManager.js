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
        } else if (res.choice === 'View Low Inventory') {
            lowQuantity();
        } else if (res.choice === 'Add to Inventory') {
            add();
        } else if (res.choice === 'Add New Product') {
            addNew();
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

function lowQuantity() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', (err, res) => {
        if (err) throw err;
        console.table(res);
    });
}

function add() {
    inq.prompt({
        type: 'input',
        message: 'Please enter the item_id you want to add inventory to',
        name: 'item'
    }).then(res => {
        let item = res.item;
        inq.prompt({
            type: 'input',
            message: 'How much do you want to add to the inventory?',
            name: 'num'
        }).then(result => {
            let num = result.num;
            connection.query('SELECT * FROM products WHERE ?', { item_id: item }, (err, res1) => {
                if (err) throw err;
                console.table(res1);

                let final = res1[0].stock_quantity + num;
                connection.query('UPDATE products SET ? WHERE ?', [{ stock_quantity: final }, { item_id: item }], err => {
                    if (err) throw err;
                    viewProducts();
                });
            });

        });
    });
}

function addNew() {
    inq.prompt({
        type: 'input',
        message: 'Please enter product name',
        name: 'result'
    }).then(name => {
        let productName = name.result;
        inq.prompt({
            type: 'input',
            message: 'Please enter the department name, the price, and the quantity separated by a space',
            name: 'depPrice'
        }).then(res => {
            let arr = res.depPrice.split(' ');
            let department = arr[0];
            let price = arr[1];
            let quantity = parseInt(arr[2]);
            connection.query('INSERT INTO products SET ?', { product_name: productName, department_name: department, price: price, stock_quantity: quantity }, (err, res) => {
                if (err) throw err;
                viewProducts();
            });
        });
    });
}

start();