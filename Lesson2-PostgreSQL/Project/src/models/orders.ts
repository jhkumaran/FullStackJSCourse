import client from '../database';

export class Orders {
    id: Number | undefined;
    status: string = '';
    user_id: number | undefined;
}

export class OrdersStore {
    async index() : Promise<Orders[]>{
        try{
            const conn = await client.connect();
            const sql = `SELECT * FROM orders`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err) {
          throw new Error(`unable to fetch orders`);
        } 
    }

    async show(id: string): Promise<Orders>{
        try{
            const conn = await client.connect();
            const sql = `SELECT * FROM orders WHERE id=${id}`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        }catch(err) {
          throw new Error(`unable to fetch orders`);
        } 
    }

    async create(o: Orders): Promise<Orders> {
        try {
            const conn = await client.connect();
            const sql = `INSERT INTO orders (status,user_id) VALUES('${o.status}',${o.user_id})`;
            const result = await conn.query(sql);
            conn.release();
            return o;
        } catch(err) {
          throw new Error(`unable create order: ${err}`);
        } 
    }
}