import client from '../database';

export class Book {
    title: string = "";
    author: string = "";
    total_pages: Number | undefined;
    type: string = "";
    summary: string = "";
    id: Number | undefined;
}

export class BookStore{
    async index(): Promise<Book[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM books';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            throw new Error(`Cannot get books: ${err}`);
        }
    }

    async show(id: string): Promise<Book> {
        try {
        const sql = `SELECT * FROM books WHERE id=${id}`;
        const conn = await client.connect();
        const result = await conn.query(sql);
        conn.release();
        return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find book ${id}. Error: ${err}`);
        }
    }

    async create(b: Book): Promise<Book> {
        try {
            console.log(b);
            const sql = `INSERT INTO books(title, author, total_pages,type, summary) VALUES('${b.title}','${b.author}',${b.total_pages},'${b.type}','${b.summary}')`;
            console.log(sql);
            const conn = await client.connect();
            const result = await conn.query(sql);
            const book = result.rows[0];
            conn.release();
            return book;
        } catch (err) {
            throw new Error(`Could not add new book ${b.title}. Error: ${err}`);
        }
    }
  
    async delete(id: string): Promise<Book> {
        try {
            const sql = `DELETE FROM books WHERE id=${id}`;
            const conn = await client.connect();
            const result = await conn.query(sql);
            const book = result.rows[0];
            conn.release();
            return book;
        } catch (err) {
            throw new Error(`Could not delete book ${id}. Error: ${err}`);
        }
    }


}