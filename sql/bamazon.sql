DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Harry Potter and the Goblet of Fire Hard Cover", "Books", 28.79, 42);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Discrete Mathematics with Applications 4th Edition", "Books", 89.95, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Catan The Board Game", "Toys and Games", 24.99, 15);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Pandemic", "Toys and Games", 34.38, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("To Kill a Mockingbird: A Graphic Novel Hardcover", "Books", 15.39, 8);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("A Wrinkle in Time: The Graphic Novel Paperback", "Books", 12.99, 80);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Cards Against Humanity", "Toys and Games", 25, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Splendor", "Toys and Games", 32.75, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Google Chromecast (3rd Generation)", "Electronics", 35, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Apple TV 4K (32GB, Latest Model)", "Electronics", 170, 5);


SELECT * from products;