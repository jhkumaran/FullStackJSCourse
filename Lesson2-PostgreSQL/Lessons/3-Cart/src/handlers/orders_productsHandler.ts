import { Application, Request, Response } from "express";
import { Orders_Products, Orders_ProductsStore } from "../models/orders_products";

const store = new Orders_ProductsStore();

const show = async(req:Request, res:Response) => {
    const id: string = req.params.orderid as string || '';
    console.log(id);
    const order = await store.show(id);
    res.send(order);
}

const addProduct = async(req:Request, res:Response) => {
    const id: number = req.params.orderid as unknown as number;
    console.log(id);
    const order: Orders_Products = {
        quantity:req.body.quantity,
        order_id: id,
        product_id: req.body.product_id,
        id:undefined
    };
    console.log(order);
    const newOrder = await store.create(order);
    res.send(newOrder);
}

export const orders_Productsroutes = (app: Application) => {
    app.get('/orders/:orderid/products',show);
    app.post('/orders/:orderid/products', addProduct);
}