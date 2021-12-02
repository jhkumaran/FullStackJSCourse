import { Application, Request, Response } from "express";
import { Products, ProductsStore } from "../models/products";

const store = new ProductsStore();

const create = async(req:Request, res:Response) => {
    const product: Products = {
        name:req.body.name,
        price: req.body.price,
        id:undefined
    };
    console.log(product);
    const newProduct = await store.create(product);
    res.send(newProduct);
}

const index = async(req:Request, res:Response) => {
    const products = await store.index();
    res.send(products);
}

const show = async(req:Request, res:Response) => {
    const id: string = req.params.id as string || '';
    console.log(id);
    const product = await store.show(id);
    res.send(product);
}

export const products_routes = (app: Application) => {
    app.get('/products',index);
    app.get('/products/:id',show);
    app.post('/products', create);
}