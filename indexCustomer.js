/*** /index.js
***/


/*** Require
***/

const inquirer = require( 'inquirer' );
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

var databaseConnection;


/*** FUNCTION createConnection()
***/

const createConnection = function() {
    return new Promise(
        ( resolve , reject ) => {
            databaseConnection = mysql.createConnection( databaseSettings );
            resolve();
        }
    );
}


/*** FUNCTION openConnection()
***/

const openConnection = function() {
    return new Promise(
        ( resolve , reject ) => {
            databaseConnection.connect(
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
            databaseConnection.query(
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
            databaseConnection.query(
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
            databaseConnection.query(
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
            databaseConnection.end();

            console.log( '' );
            console.log( 'Closed database connection.' );
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


/*** FUNCTION askOrder()
***/

const askOrder = async function() {
    var queryResult = await queryProducts( [ 'id' , 'product_name' , 'price' ] );
    var queryResultString = queryResultToString( queryResult );

    return (
        inquirer.prompt(
            [
                {
                    type : 'input' ,
                    name : 'id' ,
                    prefix : `${queryResultString}` ,
                    message : 'What do you want to buy? (Enter product ID):' ,
                    validate : ( input ) => !isNaN( input )
                } ,
                {
                    type : 'input' ,
                    name : 'quantity' ,
                    message : 'How many?'
                }
            ]
        )
    );
}


/*** FUNCTION doOrder()
***/

const doOrder = async function( order ) {
    var queryResult = await queryProduct( order.id , [ 'id' , 'product_name' , 'price' , 'stock_quantity' ] );

    // check product exists
    if ( queryResult.rows[ 0 ].length ) {
        console.log( '' );
        console.log( 'Product is not available.' )
        return false;
    }

    // check enough quantity is available
    if ( queryResult.rows[ 0 ].stock_quantity < order.quantity ) {
        console.log( '' );
        console.log( 'There is not enough quantity of this product.' )
        return false;
    }

    // purchase product
    var updateResult = await updateProduct( order.id , order.quantity );

    // order total
    var total = ( queryResult.rows[ 0 ].price * order.quantity );
    console.log( '' );
    console.log( `Your order total for ${order.quantity} ${( order.quantity === 1 ? 'copy' : 'copies' )} of "${queryResult.rows[ 0 ].product_name}" is \$${total}.` );
    console.log( 'Thank you for shopping with us! See you soon!' );

    return true;
}


/*** FUNCTION main()
***/

const main = async function() {
    await createConnection();
    await openConnection();

    console.log( '' );
    console.log( 'Welcome to our store!' );
    console.log( '' );

    var order = await askOrder();
    await doOrder( order );
    await closeConnection();
}


/*** Start
***/

main();
