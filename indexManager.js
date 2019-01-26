/*** /indexManager.js
***/


/*** Require
***/

const productUtil = require( './productUtil' );
const inquirer = require( 'inquirer' );


/*** FUNCTION askCommand()
***/

const askCommand = async function() {
    return (
        inquirer.prompt(
            [
                {
                    type : 'list' ,
                    name : 'command' ,
                    message : 'What do you want to do?' ,
                    choices : [
                        'View Products for Sale' ,
                        'View Low Inventory' ,
                        'Add to Inventory' ,
                        'Add New Product' ,
                        'Exit'
                    ]
                }
            ]
        )
        .then(
            ( result ) => result.command
        )
    );
}


/*** FUNCTION askAddInventory()
***/

const askAddInventory = async function() {
    return (
        inquirer.prompt(
            [
                {
                    type : 'prompt' ,
                    name : 'productId' ,
                    message : 'Enter product ID:' ,
                    validate : ( input ) => !isNaN( input )
                } ,
                {
                    type : 'prompt' ,
                    name : 'quantity' ,
                    message : 'How many to add?' ,
                    validate : ( input ) => !isNaN( input )
                }
            ]
        )
    );
}


/*** FUNCTION askAddNewProduct()
***/

const askAddNewProduct = async function() {
    console.log( 'Please enter new product info.' );
    return (
        inquirer.prompt(
            [
                {
                    type : 'prompt' ,
                    name : 'productName' ,
                    message : 'Product name:'
                } ,
                {
                    type : 'prompt' ,
                    name : 'departmentName' ,
                    message : 'Department name:'
                } ,
                {
                    type : 'prompt' ,
                    name : 'price' ,
                    message : 'Price:' ,
                    validate : ( input ) => !isNaN( input )
                } ,
                {
                    type : 'prompt' ,
                    name : 'stockQuantity' ,
                    message : 'Stock quantity:' ,
                    validate : ( input ) => !isNaN( input )
                }
            ]
        )
    );
}


/*** FUNCTION doViewProducts()
***/

const doViewProducts = async function() {
    var queryResult = await productUtil.queryProducts();
    var queryResultString = productUtil.queryResultToString( queryResult );
    console.log( queryResultString );
}


/*** FUNCTION doViewLowInventory()
***/

const doViewLowInventory = async function() {
    var queryResult = await productUtil.queryProductsLessThan( 5 );
    var queryResultString = productUtil.queryResultToString( queryResult );
    console.log( queryResultString );
}


/*** FUNCTION doAddInventory()
***/

const doAddInventory = async function() {
    var answer = await askAddInventory();

    // check product exists
    var queryResult = await productUtil.queryProduct( answer.productId , [ 'id' ] );
    if ( queryResult.rows.length === 0 ) {
        console.log( 'Sorry! Product does not exist. Please add a new product.' );
        return false;
    }

    var updateResult = await productUtil.updateProductAddStockQuantity( answer.productId , answer.quantity );
    console.log( 'Done!' );
}


/*** FUNCTION doAddNewProduct()
***/

const doAddNewProduct = async function() {
    var newProduct = await askAddNewProduct();

    // check product exists
    var queryResult = await productUtil.queryProductByName( newProduct.productName , [ 'product_name' ] );
    if ( queryResult.rows.length ) {
        console.log( `Product "${newProduct.productName}" already exists.` );
        return false;
    }

    // add new product
    var updateResult = await productUtil.insertProduct( newProduct );
    console.log( 'Done!' );
}


/*** FUNCTION doCommand()
***/

const doCommand = async function( command ) {

    if ( command === 'View Products for Sale' ) {
        await doViewProducts();
    }
    else if ( command === 'View Low Inventory' ) {
        await doViewLowInventory();
    }
    else if ( command === 'Add to Inventory' ) {
        await doAddInventory();
    }
    else if ( command === 'Add New Product' ) {
        await doAddNewProduct();
    }
    else if ( command === 'Exit' ) {
        console.log( 'Good Bye!' );
    }
}

/*** FUNCTION main()
***/

const main = async function() {
    try {
        await productUtil.createConnection();
        await productUtil.openConnection();

        console.log( '' );
        console.log( 'Good morning, Mr. Manager!' );

        var command;
        do {
            console.log( '' );
            command = await askCommand();
            await doCommand( command );
        }
        while ( command !== 'Exit' );

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
