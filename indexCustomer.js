/*** /indexCustomer.js
***/


/*** Require
***/

const productUtil = require( './productUtil' );
const inquirer = require( 'inquirer' );


/*** FUNCTION askOrder()
***/

const askOrder = async function() {
    var queryResult = await productUtil.queryProducts( [ 'id' , 'product_name' , 'price' ] );
    var queryResultString = productUtil.queryResultToString( queryResult );

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
                    message : 'How many?' ,
                    validate : ( input ) => !isNaN( input )
                }
            ]
        )
    );
}


/*** FUNCTION doOrder()
***/

const doOrder = async function( order ) {
    var queryResult = await productUtil.queryProduct( order.id , [ 'id' , 'product_name' , 'price' , 'stock_quantity' ] );

    // check product exists
    if ( queryResult.rows.length === 0 ) {
        console.log( '' );
        console.log( 'Sorry! Product is not available.' )
        console.log( 'Thank you for shopping with us! See you soon!' );
        return false;
    }

    // check enough quantity is available
    if ( queryResult.rows[ 0 ].stock_quantity < order.quantity ) {
        console.log( '' );
        console.log( 'Sorry! There is not enough quantity of this product.' )
        console.log( 'Thank you for shopping with us! See you soon!' );
        return false;
    }

    // purchase product
    var updateResult = await productUtil.updateProductReduceStockQuantity( order.id , order.quantity );

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
    try {
        await productUtil.createConnection();
        await productUtil.openConnection();

        console.log( '' );
        console.log( 'Welcome to our store!' );
        console.log( '' );

        var order = await askOrder();
        await doOrder( order );
        await productUtil.closeConnection();
    }
    catch( error ) {
        if( productUtil.getConnection().threadId ) {
            await productUtil.closeConnection();
        }
        console.log( error );
    }
}


/*** Start
***/

main();
