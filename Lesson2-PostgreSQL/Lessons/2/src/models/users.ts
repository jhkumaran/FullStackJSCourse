import client from '../database';
import bcrypt from 'bcrypt';

export class Users {
    id: Number | undefined;
    username: string = '';
    password: string | undefined;
}

export class UserStore{
    async create(u: Users): Promise<Users> {
        try {
            const pepper:string = process.env.BCRYPT_PASSWORD || '';
            const saltRounds:string = process.env.saltRounds || '';
            const conn = await client.connect();
                
            const hash = bcrypt.hashSync(u.password + pepper,parseInt(saltRounds));
            const sql = `INSERT INTO users (username, password_digest) VALUES('${u.username}', '${hash}')`;
            console.log(hash);
            console.log(sql);
            const result = await conn.query(sql);
            const user = result.rows[0];

            conn.release();
            return user;
        } catch(err) {
          throw new Error(`unable create user (${u.username}): ${err}`);
        } 
    }

    async authenticate(username:string, password: string) : Promise<Users | null> {
        try{
            const pepper:string = process.env.BCRYPT_PASSWORD || '';
            const saltRounds:string = process.env.saltRounds || '';
            const conn = await client.connect();
            const sql = `SELECT * FROM users where username='${username}'`;
            const result = await conn.query(sql);
            if(result.rows.length){
                const user = result.rows[0];
                if(bcrypt.compareSync((password+pepper), user.password_digest)){
                    return user;
                }
            }
            return null;
        }catch(err) {
          throw new Error(`unable to get (${username}): ${err}`);
        } 
    }
}