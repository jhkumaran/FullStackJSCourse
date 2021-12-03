## API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm install` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Postgres DB
Create a DB with the details and credentials provided in the `database.json` file. Else, update the database name and psql password to connect in `database.json` and `.env` files.
Open the terminal and run 'db-migrate up' command for the project to setup the required tables in the database.

## Build
Once the database is setup, build the project with the command `npm run build`. Once the build is completed, the project can be started with the command `node build/server`. This will launch the API.

## API Endpoints

## Home
`http://localhost:3000/` - To create admin user. If you use Postman and get this url, admin user will be created and admin token will be passed as output. Use this token to create other users and add products to the store. Only admin user token can be used to create user and add products. Each user created will have a separate token which is needed to create a order and add products to the order.


## User
`http://localhost:3000/users/` - This endpoint is used for both get and post users. 
Get: Need to pass the token created for admin in the previous step in the request body to fetch the available users.
Post: Need to pass the user firstname, lastname, password and admin token to create a new user. A token created for the user will be sent which needs to be used while creating orders for the user.

`http://localhost:3000/authenticate/` - This endpoint is used to authenticate the user details. The user id and password needs to be passed in the request body along with the admin token to validate the user.

`http://localhost:3000/users/:id/orders/` - This endpoint is used to fetch the orders of the user whose id matches with the id passed in the parameter. The user token needs to be passed in the request to validate the user.

## Products
`http://localhost:3000/products/` - This endpoint is used for both get and post products. 
# Get: 
Gets the available products.
# Post: 
Need to pass the product name, price, category and admin token to create a new product.

`http://localhost:3000/products/:id` - This endpoint is used to fetch details of a specific product whose id matches with the id passed in the parameter.

`http://localhost:3000/products/category/:category/` - This endpoint is used to fetch details of all the products that matches a particular category.

## Orders
`http://localhost:3000/orders/` - This endpoint is used for both get and post orders. 
# Get: 
Gets the orders.
# Post: 
Need to pass the user id, status and user token to create a new order.

`http://localhost:3000/orders/:id/` - This endpoint is used to fetch details of a specific order whose id matches with the id passed in the parameter.

`http://localhost:3000/orders/:orderid/products/` - This endpoint is used for adding products to an order and fetching details of an oder.
# Get: 
Need to pass the order id and user token to fetch the products added to the order whose id is equal to the order id.
# Post: 
Need to pass order id, product id, quantity and user token to add a product to an order whose id is equal to the order id.

## Unit Testing
Create tables in the test db with the command `db-migrate up --env test`. Once the tables are created, the test cases can be run using the command 
`npm run test`.

## Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you. 

**NB:** The given values are used in developement and testing but not in production. 
```
POSTGRES_HOST='localhost'
POSTGRES_DB='shopping_db'
POSTGRES_DB_TEST='shopping_db_test'
POSTGRES_USER='postgres'
POSTGRES_PASSWORD='Password@123'
ENV=dev
BCRYPT_PASSWORD='shopping-app-bcrypt-password'
SALT_ROUNDS=10
WEB_TOKEN='abcd1234!'
ADMIN_PWD='Admin@1234'
TOKEN_TEST='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0bmFtZSI6IkFkbWluIGZpcnN0IG5hbWUiLCJsYXN0bmFtZSI6IkFkbWluIGxhc3QgbmFtZSIsInBhc3N3b3JkIjoiQWRtaW5AMTIzNCJ9LCJpYXQiOjE2Mzg0NTYxMDh9.6AKanDnLTNanu3Cpy8ct-VLzkAjkn_UVg7yOlFrs3Is'

