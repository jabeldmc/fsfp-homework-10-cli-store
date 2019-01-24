/*** /database/schema.sql
***/

CREATE DATABASE fsfp_store;

USE fsfp_store;

CREATE TABLE products (
    item_id    INTEGER AUTO_INCREMENT PRIMARY KEY ,
    product_name    VARCHAR( 255 ) ,
    department_name    VARCHAR( 255 ) ,
    price    DECIMAL( 10 , 2 ) ,
    stock_quantity    INTEGER
);
