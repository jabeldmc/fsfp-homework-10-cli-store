/*** /database/schema.sql
***/

DROP DATABASE IF EXISTS fsfp_store;

CREATE DATABASE fsfp_store;

USE fsfp_store;

CREATE TABLE products (
    id    INTEGER AUTO_INCREMENT PRIMARY KEY ,
    product_name    VARCHAR( 255 ) NOT NULL UNIQUE ,
    department_name    VARCHAR( 255 ) NOT NULL ,
    price    DECIMAL( 10 , 2 ) NOT NULL ,
    stock_quantity    INTEGER NOT NULL
);
