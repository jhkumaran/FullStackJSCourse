import client from '../database';

export class Products {
    id: Number | undefined;
    name: string = '';
    price: number = 0;
    category:string = '';
}

export class ProductsStore{
    async create(p: Products): Promise<Products> {
        try {
            const conn = await client.connect();
            const sql = `INSERT INTO products (name,price,category) VALUES('${p.name}',${p.price},'${p.category}')`;
            const result = await conn.query(sql);
            conn.release();
            return p;
        } catch(err) {
          throw new Error(`unable create product (${p.name}): ${err}`);
        } 
    }

    async index() : Promise<Products[]>{
        try{
            const conn = await client.connect();
            const sql = `SELECT * FROM products`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err) {
          throw new Error(`unable to fetch products`);
        } 
    }

    async show(id: string): Promise<Products>{
        try{
            const conn = await client.connect();
            const sql = `SELECT * FROM products WHERE id=${id}`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        }catch(err) {
          throw new Error(`unable to fetch products`);
        } 
    }

    async showByCategory(category: string): Promise<Products[]>{
        try{
            const conn = await client.connect();
            const sql = `SELECT * FROM products WHERE category='${category}'`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err) {
          throw new Error(`unable to fetch products`);
        } 
    }
}