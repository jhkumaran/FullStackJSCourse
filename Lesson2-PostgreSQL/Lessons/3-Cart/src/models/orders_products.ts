import client from '../database';

export class Orders_Products {
    id: Number | undefined;
    quantity: number | undefined;
    order_id: number | undefined;
    product_id: number | undefined;
}

export class Orders_ProductsStore {
    async show(order_id: string): Promise<Orders_Products[]>{
        try{
            const conn = await client.connect();
            const sql = `SELECT order_id,product_id,name,price,quantity FROM orders_products INNER JOIN products ON products.id = orders_products.product_id WHERE order_id='${order_id}' ORDER BY quantity`;
            console.log(sql);
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err) {
          throw new Error(`unable to fetch orders_products`);
        } 
    }

    async create(p: Orders_Products): Promise<Orders_Products> {
        try {
            const conn = await client.connect();
            const sql = `INSERT INTO orders_products (quantity,order_id,product_id) VALUES('${p.quantity}',${p.order_id}, ${p.product_id})`;
            console.log(sql);
            const result = await conn.query(sql);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch(err) {
          throw new Error(`unable create orders_products: ${err}`);
        } 
    }
}