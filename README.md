# fsfp-homework-10-cli-store

Full Stack Flex Program Homework 10: CLI Store


# Introduction

This is a command-line store inventory application. There are two different programs: one for customers and one for store managers.


# Customer Program

To run the customer program, type the following in the command line:

```
node indexCustomer.js
```

The program will display the available items, and prompt for the product's ID and quantity to buy.

```
Welcome to our store!

┌────┬─────────────────────────────────────────────────────────────────────────────┬───────┐
│ id │ product_name                                                                │ price │
├────┼─────────────────────────────────────────────────────────────────────────────┼───────┤
│ 1  │ Kalafina - Seventh Heaven                                                   │ 10.99 │
│ 2  │ Kalafina - Red Moon                                                         │ 11.99 │
│ 3  │ Kalafina - After Eden                                                       │ 12.99 │
│ 4  │ Kalafina - Consolation                                                      │ 13.99 │
│ 5  │ Kalafina - Far on the Water                                                 │ 14.99 │
│ 6  │ Calvin and Hobbes - The Essential Calvin and Hobbes                         │ 20.99 │
│ 7  │ Calvin and Hobbes - The Authoritative Calvin and Hobbes                     │ 21.99 │
│ 8  │ Calvin and Hobbes - The Indispensable Calvin and Hobbes                     │ 22.99 │
│ 9  │ Calvin and Hobbes - Attack of the Deranged Mutant Killer Monster Snow Goons │ 23.99 │
│ 10 │ Calvin and Hobbes - The Days Are Just Packed                                │ 24.99 │
│ 11 │ dummy                                                                       │ 1     │
│ 12 │ dummy2                                                                      │ 1     │
└────┴─────────────────────────────────────────────────────────────────────────────┴───────┘
 What do you want to buy? (Enter product ID): 1
? How many? 2
```

If not enough quantity of the product is available, the program will show a corresponding message.

```
Sorry! There is not enough quantity of this product.
Thank you for shopping with us! See you soon!
```

Likewise, the program displays a message if the product is not available.

```
Your order total for 2 copies of "Kalafina - Seventh Heaven" is $21.98.
Thank you for shopping with us! See you soon!
```

If the selected product is not available, the program will display a corresponding message.

```
Sorry! Product is not available.
Thank you for shopping with us! See you soon!
```

# Manager Program

To run the manager program, type the following in the command line:

```
node indexManager.js
```

The manager program will display a meny with options.

```
Good morning, Mr. Manager!

? What do you want to do? (Use arrow keys)
❯ View Products for Sale
  View Low Inventory
  Add to Inventory
  Add New Product
  Exit
```

## View Products for Sale

Displays all products on inventory.

```
? What do you want to do? View Products for Sale
┌────┬─────────────────────────────────────────────────────────────────────────────┬─────────────────┬───────┬────────────────┐
│ id │ product_name                                                                │ department_name │ price │ stock_quantity │
├────┼─────────────────────────────────────────────────────────────────────────────┼─────────────────┼───────┼────────────────┤
│ 1  │ Kalafina - Seventh Heaven                                                   │ Music           │ 10.99 │ 12             │
│ 2  │ Kalafina - Red Moon                                                         │ Music           │ 11.99 │ 16             │
│ 3  │ Kalafina - After Eden                                                       │ Music           │ 12.99 │ 8              │
│ 4  │ Kalafina - Consolation                                                      │ Music           │ 13.99 │ 10             │
│ 5  │ Kalafina - Far on the Water                                                 │ Music           │ 14.99 │ 10             │
│ 6  │ Calvin and Hobbes - The Essential Calvin and Hobbes                         │ Books           │ 20.99 │ 10             │
│ 7  │ Calvin and Hobbes - The Authoritative Calvin and Hobbes                     │ Books           │ 21.99 │ 10             │
│ 8  │ Calvin and Hobbes - The Indispensable Calvin and Hobbes                     │ Books           │ 22.99 │ 10             │
│ 9  │ Calvin and Hobbes - Attack of the Deranged Mutant Killer Monster Snow Goons │ Books           │ 23.99 │ 10             │
│ 10 │ Calvin and Hobbes - The Days Are Just Packed                                │ Books           │ 24.99 │ 9              │
│ 11 │ dummy                                                                       │ dummy           │ 1     │ 1              │
│ 12 │ dummy2                                                                      │ dummy2          │ 1     │ 1              │
└────┴─────────────────────────────────────────────────────────────────────────────┴─────────────────┴───────┴────────────────┘
```

## View Low Inventory

Displays products with less than 5 items on inventory.

```
? What do you want to do? View Low Inventory
┌────┬──────────────┬─────────────────┬───────┬────────────────┐
│ id │ product_name │ department_name │ price │ stock_quantity │
├────┼──────────────┼─────────────────┼───────┼────────────────┤
│ 11 │ dummy        │ dummy           │ 1     │ 1              │
│ 12 │ dummy2       │ dummy2          │ 1     │ 1              │
└────┴──────────────┴─────────────────┴───────┴────────────────┘
```

## Add to Inventory

Asks the manager for the product ID for which to add inventory, and the inventory to add.

```
? What do you want to do? Add to Inventory
? Enter product ID: 1
? How many to add? 10
Done!
```

The program will display a message if the product is not available.

```
? What do you want to do? Add to Inventory
? Enter product ID: 10000
? How many to add? 1
Sorry! Product does not exist. Please add a new product.
```

## Add New Product

The program asks the manager for the information of the new product to add.

```
? What do you want to do? Add New Product
Please enter new product info.
? Product name: my new product
? Department name: some department
? Price: 10.99
? Stock quantity: 1
Done!
```

The manager can verify the new product was added with command "View Products for Sale".

```
? What do you want to do? View Products for Sale
┌────┬─────────────────────────────────────────────────────────────────────────────┬─────────────────┬───────┬────────────────┐
│ id │ product_name                                                                │ department_name │ price │ stock_quantity │
├────┼─────────────────────────────────────────────────────────────────────────────┼─────────────────┼───────┼────────────────┤
│ 1  │ Kalafina - Seventh Heaven                                                   │ Music           │ 10.99 │ 22             │
│ 2  │ Kalafina - Red Moon                                                         │ Music           │ 11.99 │ 16             │
│ 3  │ Kalafina - After Eden                                                       │ Music           │ 12.99 │ 8              │
│ 4  │ Kalafina - Consolation                                                      │ Music           │ 13.99 │ 10             │
│ 5  │ Kalafina - Far on the Water                                                 │ Music           │ 14.99 │ 10             │
│ 6  │ Calvin and Hobbes - The Essential Calvin and Hobbes                         │ Books           │ 20.99 │ 10             │
│ 7  │ Calvin and Hobbes - The Authoritative Calvin and Hobbes                     │ Books           │ 21.99 │ 10             │
│ 8  │ Calvin and Hobbes - The Indispensable Calvin and Hobbes                     │ Books           │ 22.99 │ 10             │
│ 9  │ Calvin and Hobbes - Attack of the Deranged Mutant Killer Monster Snow Goons │ Books           │ 23.99 │ 10             │
│ 10 │ Calvin and Hobbes - The Days Are Just Packed                                │ Books           │ 24.99 │ 9              │
│ 11 │ dummy                                                                       │ dummy           │ 1     │ 1              │
│ 12 │ dummy2                                                                      │ dummy2          │ 1     │ 1              │
│ 13 │ my new product                                                              │ some department │ 10.99 │ 1              │
└────┴─────────────────────────────────────────────────────────────────────────────┴─────────────────┴───────┴────────────────┘
```

The program displays a message if the item already exists.

```
? What do you want to do? Add New Product
Please enter new product info.
? Product name: Kalafina - Seventh Heaven
? Department name: Music
? Price: 10.99
? Stock quantity: 10
Product "Kalafina - Seventh Heaven" already exists.
```


# History

## Build 3

* Completed challenge 2.

## Build 2

* Completed challenge 1.

## Build 1

* Project structure.
