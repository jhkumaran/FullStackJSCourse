import { Application, Request, Response } from "express";
import { Products, ProductsStore } from "../models/products";
import { verifyAuthToken } from '../utilities/verifyJWT';

const store = new ProductsStore();

const create = async(req:Request, res:Response) => {
    const product: Products = {
        name:req.body.name,
        price: req.body.price,
        category: req.body.category,
        id:undefined
    };
    const newProduct = await store.create(product);
    res.send(newProduct);
}

const index = async(req:Request, res:Response) => {
    const products = await store.index();
    res.send(products);
}

const show = async(req:Request, res:Response) => {
    const id: string = req.params.id as string || '';
    const product = await store.show(id);
    res.send(product);
}

const showByCategory = async(req: Request, res: Response) => {
    const category: string = req.params.category as string || '';
    const products = await store.showByCategory(category);
    res.send(products);
}

export const products_routes = (app: Application) => {
    app.get('/products/',index);
    app.post('/products/',verifyAuthToken, create);
    app.get('/products/:id',show);
    app.get('/products/category/:category',showByCategory);
}