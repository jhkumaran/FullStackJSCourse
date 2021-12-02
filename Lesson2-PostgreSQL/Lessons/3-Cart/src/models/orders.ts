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
            const sql = `SELECT * FROM orders WHERE id='${id}'`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        }catch(err) {
          throw new Error(`unable to fetch orders`);
        } 
    }

    async create(p: Orders): Promise<Orders> {
        try {
            const conn = await client.connect();
            const sql = `INSERT INTO orders (status,user_id) VALUES('${p.status}',${p.user_id})`;
            console.log(sql);
            const result = await conn.query(sql);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch(err) {
          throw new Error(`unable create order: ${err}`);
        } 
    }
}