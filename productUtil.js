/*** /productUtil.js
***/

const mysql = require( 'mysql' );
const table = require( 'table' );


/*** Constant
***/

const databaseSettings = {
    host : 'localhost' ,
    port : 3306 ,
    user : 'root' ,
    password : 'gaogaofire' ,
    database : 'fsfp_store'
};

const tableSettings = {
    border : table.getBorderCharacters( 'norc' ) ,
    drawHorizontalLine : ( index , size ) => ( ( index === 0 ) || ( index === 1 ) || ( index === size ) )
};


/*** Global variables
***/

var connection;


/*** FUNCTION getFieldsString()
***/

const getFieldsString = function( fields ) {
    // fields to select
    var fieldsString;
    if ( fields ) {
        fieldsString = fields.join( ' , ' );
    }
    else {
        fieldsString = '*';
    }

    return fieldsString;
}



/*** FUNCTION getConnection()
***/

const getConnection = function() {
    return connection;
}


/*** FUNCTION createConnection()
***/

const createConnection = function() {
    return new Promise(
        ( resolve , reject ) => {
            connection = mysql.createConnection( databaseSettings );
            resolve();
        }
    );
}


/*** FUNCTION openConnection()
***/

const openConnection = function() {
    return new Promise(
        ( resolve , reject ) => {
            connection.connect(
                ( error ) => {
                    // check error
                    if ( error ) {
                        reject( error );
                    }
                    resolve();
                }
            );
        }
    );
}


/*** FUNCTION queryProducts()
***/

const queryProducts = function( fields ) {
    // fields to select
    var fieldsString = getFieldsString( fields );

    // prepare query
    var sql = `SELECT ${fieldsString} FROM products`;

    // return promise
    return new Promise(
        ( resolve , reject ) => {
            connection.query(
                sql ,
                ( error , rows , fields ) => {
                    resolve( { error: error , rows: rows , fields: fields } );
                }
            );
        }
    );
}


/*** FUNCTION queryProduct()
***/

const queryProduct = function( id , fields ) {
    var fieldsString = getFieldsString( fields );

    // prepare query
    var sql = mysql.format(
        `SELECT ${fieldsString} FROM products WHERE ?? = ?` ,
        [ 'id' , id ]
    );

    // return promise
    return new Promise(
        ( resolve , reject ) => {
            connection.query(
                sql ,
                ( error , rows , fields ) => {
                    resolve( { error: error , rows: rows , fields: fields } );
                }
            );
        }
    );
}


/*** FUNCTION queryProductByName()
***/

const queryProductByName = function( productName , fields ) {
    var fieldsString = getFieldsString( fields );

    // prepare query
    var sql = mysql.format(
        `SELECT ${fieldsString} FROM products WHERE ?? = ?` ,
        [ 'product_name' , productName ]
    );

    // return promise
    return new Promise(
        ( resolve , reject ) => {
            connection.query(
                sql ,
                ( error , rows , fields ) => {
                    resolve( { error: error , rows: rows , fields: fields } );
                }
            );
        }
    );
}


/*** FUNCTION queryProductsLessThan()
***/

const queryProductsLessThan = function( stock_quantity , fields ) {
    var fieldsString = getFieldsString( fields );

    // prepare query
    var sql = mysql.format(
        `SELECT ${fieldsString} FROM products WHERE ?? <= ?` ,
        [ 'stock_quantity' , stock_quantity ]
    );

    // return promise
    return new Promise(
        ( resolve , reject ) => {
            connection.query(
                sql ,
                ( error , rows , fields ) => {
                    resolve( { error: error , rows: rows , fields: fields } );
                }
            );
        }
    );
}


/*** FUNCTION updateProductReduceStockQuantity()
***/

const updateProductReduceStockQuantity = function( id , stock_quantity ) {
    // prepare query
    var sql = mysql.format(
        'UPDATE products SET ?? = ( ?? - ? ) WHERE ?? = ?' ,
        [ 'stock_quantity' , 'stock_quantity' , stock_quantity , 'id' , id ]
    );

    // return promise
    return new Promise(
        ( resolve , reject ) => {
            connection.query(
                sql ,
                ( error , rows , fields ) => {
                    resolve( { error: error , rows: rows , fields: fields } );
                }
            );
        }
    );
}


/*** FUNCTION updateProductAddStockQuantity()
***/

const updateProductAddStockQuantity = function( id , stock_quantity ) {
    // prepare query
    var sql = mysql.format(
        'UPDATE products SET ?? = ( ?? + ? ) WHERE ?? = ?' ,
        [ 'stock_quantity' , 'stock_quantity' , stock_quantity , 'id' , id ]
    );

    // return promise
    return new Promise(
        ( resolve , reject ) => {
            connection.query(
                sql ,
                ( error , rows , fields ) => {
                    resolve( { error: error , rows: rows , fields: fields } );
                }
            );
        }
    );
}


/*** FUNCTION insertProduct()
***/

const insertProduct = function( newProduct ) {
    // prepare query
    var sql = mysql.format(
        'INSERT INTO products ( ?? , ?? , ?? , ?? ) VALUES ( ? , ? , ? , ? )' ,
        [
            'product_name' , 'department_name' , 'price' , 'stock_quantity' ,
            newProduct.productName , newProduct.departmentName , newProduct.price , newProduct.stockQuantity
        ]
    );

    // return promise
    return new Promise(
        ( resolve , reject ) => {
            connection.query(
                sql ,
                ( error , rows , fields ) => {
                    resolve( { error: error , rows: rows , fields: fields } );
                }
            );
        }
    );
}


/*** FUNCTION closeConnection()
***/

const closeConnection = function() {
    return new Promise(
        ( resolve , reject ) => {
            connection.end();
            resolve();
        }
    );
}


/*** FUNCTION queryResultToString
***/

function queryResultToString( queryResult ) {
    // get table headers
    var headers = queryResult.fields.map(
        ( field , fieldIndex ) => field.name
    );

    // get table data
    var data = queryResult.rows.map(
        ( row , rowIndex ) => headers.map(
            ( header , headerIndex ) => row[ header ]
        )
    );
    data.unshift( headers );

    // convert to string
    var string = table.table( data , tableSettings );

    return string;
}


module.exports = {
    getConnection : getConnection ,
    createConnection : createConnection ,
    openConnection : openConnection ,
    queryProducts : queryProducts ,
    queryProduct : queryProduct ,
    queryProductByName : queryProductByName ,
    queryProductsLessThan : queryProductsLessThan ,
    updateProductReduceStockQuantity : updateProductReduceStockQuantity ,
    updateProductAddStockQuantity : updateProductAddStockQuantity ,
    insertProduct : insertProduct ,
    closeConnection : closeConnection ,
    queryResultToString : queryResultToString
};
