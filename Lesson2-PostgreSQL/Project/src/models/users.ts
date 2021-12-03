import client from '../database';
import bcrypt from 'bcrypt';

export class Users {
    id: Number | undefined;
    firstname: string = '';
    lastname: string = '';
    password:string | undefined;
}

export class UserStore{
    async create(u: Users): Promise<Users> {
        try {
            const pepper:string = process.env.BCRYPT_PASSWORD || '';
            const saltRounds:string = process.env.saltRounds || '';
            const conn = await client.connect();

            const hash = bcrypt.hashSync(u.password + pepper,parseInt(saltRounds));
            const sql = `INSERT INTO users (firstname,lastname,password) VALUES('${u.firstname}','${u.lastname}','${hash}')`;
            const result = await conn.query(sql);
            conn.release();
            return u;
        } catch(err) {
          throw new Error(`unable create user (${u.firstname}): ${err}`);
        } 
    }

    async authenticate(id:number, password: string) : Promise<Users | null> {
        try{
            const pepper:string = process.env.BCRYPT_PASSWORD || '';
            const conn = await client.connect();
            const sql = `SELECT * FROM users where id='${id}'`;
            const result = await conn.query(sql);
            if(result.rows.length){
                const user = result.rows[0];
                if(bcrypt.compareSync((password+pepper), user.password)){
                    return user;
                }
            }
            return null;
        }catch(err) {
          throw new Error(`unable to get (${id}): ${err}`);
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
          throw new Error(`unable to fetch users: ${err}`);
        } 
    }
    async showOrders(id: string) : Promise<string[]>{
        try{
            const conn = await client.connect();
            const sql = `SELECT orders.id,users.firstname,users.lastname,status FROM users INNER JOIN orders ON users.id=orders.user_id WHERE users.id=${id}`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err) {
          throw new Error(`unable to fetch users`);
        } 
    }
}