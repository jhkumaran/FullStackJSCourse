import client from '../database';

export class Users {
    id: Number | undefined;
    name: string = '';
}

export class UserStore{
    async create(u: Users): Promise<Users> {
        try {
            const conn = await client.connect();
            const sql = `INSERT INTO users (name) VALUES('${u.name}')`;
            const result = await conn.query(sql);
            const user = result.rows[0];

            conn.release();
            return user;
        } catch(err) {
          throw new Error(`unable create user (${u.name}): ${err}`);
        } 
    }

    async index() : Promise<Users[]>{
        try{
            const conn = await client.connect();
            const sql = `SELECT * FROM users`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err) {
          throw new Error(`unable to fetch users`);
        } 
    }
    async showOrders(id: string) : Promise<string[]>{
        try{
            const conn = await client.connect();
            const sql = `SELECT orders.id,users.name,status FROM users INNER JOIN orders ON users.id=orders.user_id WHERE users.id=${id}`;
            console.log(sql);
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err) {
          throw new Error(`unable to fetch users`);
        } 
    }
}