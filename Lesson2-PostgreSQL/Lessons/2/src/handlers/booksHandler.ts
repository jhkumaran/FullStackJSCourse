import express, {Request, Response} from 'express'
import {Book, BookStore} from '../models/books'
import jwt from 'jsonwebtoken';

const store = new BookStore();

const index = async(req:Request, res: Response) => {
    const books = await store.index();
    res.json(books);
}

const show = async(req:Request, res: Response) => {
    const id: string = req.params.id as string || '';
    console.log(id);
    const book = await store.show(id);
    res.json(book);
}

const create = async(req:Request, res:Response) => {
    const newBook: Book = {
        title: req.body.title as string,
        author: req.body.author as string,
        total_pages: req.body.total_pages as unknown as Number,
        type: req.body.type as string,
        summary: req.body.summary as string,
        id: undefined
    };
    try{
        jwt.verify(req.body.token, process.env.WEB_TOKEN || '');
    }catch(err){
        res.status(401);
        res.json(`Invalid token ${err}`);
        return;
    }
    const result = store.create(newBook);
    res.json(result);
}

const deleteBook = async(req:Request, res: Response) => {
    try{
        jwt.verify(req.body.token, process.env.WEB_TOKEN || '');
    }catch(err){
        res.status(401);
        res.json(`Invalid token ${err}`);
        return;
    }
    try{
        const id: string = req.params.id as string || '';
        console.log(id);
        const book = await store.delete(id);
        res.json(book);
    }catch (err) {
        throw new Error(`Could not delete book ${req.body.id}. Error: ${err}`);
    }
    
}

const books_routes = (app: express.Application) => {
    app.get('/books', index);
    app.get('/books/:id', show);
    app.post('/books',create);
    app.delete('/books/:id', deleteBook);
}

export default books_routes;