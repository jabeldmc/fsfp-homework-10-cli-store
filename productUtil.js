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
    var fieldsString;
    if ( fields ) {
        fieldsString = fields.join( ' , ' );
    }
    else {
        fieldsString = '*';
    }

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
    // fields to select
    var fieldsString;
    if ( fields ) {
        fieldsString = fields.join( ' , ' );
    }
    else {
        fieldsString = '*';
    }

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


/*** FUNCTION updateProduct()
***/

const updateProduct = function( id , minusQuantity ) {
    // prepare query
    var sql = mysql.format(
        `UPDATE products SET ?? = ( ?? - ? ) WHERE ?? = ?` ,
        [ 'stock_quantity' , 'stock_quantity' , minusQuantity , 'id' , id ]
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
    updateProduct : updateProduct ,
    closeConnection : closeConnection ,
    queryResultToString : queryResultToString
};
