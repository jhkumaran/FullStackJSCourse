# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index (`http://localhost:3000/products/`)
- Show (`http://localhost:3000/products/:id`)
- Create [token required] (`http://localhost:3000/products/`)
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category) (`http://localhost:3000/products/category/:category/`)

#### Users
- Index [token required] (`http://localhost:3000/users/`)
- Show [token required] (`http://localhost:3000/users/:id/orders/`)
- Create N[token required] (`http://localhost:3000/users/`)

#### Orders
- Current Order by user (args: user id)[token required] (`http://localhost:3000/orders/`)
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product(model)
-  id
- name
- price
- [OPTIONAL] category

# DB Schema:
id SERIAL PRIMARY KEY,
name VARCHAR(100),
price INTEGER,
category VARCHAR(100)

#### User(model)
- id
- firstName
- lastName
- password

# DB Schema
id SERIAL PRIMARY KEY,
firstname VARCHAR(100),
lastname VARCHAR(100),
password VARCHAR

#### Orders(model)
- id
- user_id
- status of order (active or complete)

# DB Schema
id SERIAL PRIMARY KEY,
status VARCHAR(100),
user_id bigint REFERENCES users(id)

#### Orders_Products(model)
- id
- order id
- product id
- quantity of product

# DB Schema
id SERIAL PRIMARY KEY,
quantity INTEGER,
order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES products(id)