import { Application, Request, Response } from "express";
import { Orders_Products, Orders_ProductsStore } from "../models/orders_products";
import { verifyAuthToken } from '../utilities/verifyJWT';

const store = new Orders_ProductsStore();

const show = async(req:Request, res:Response) => {
    const id: number = req.params.orderid as unknown as number;
    const orderValid = await store.checkOrder(id);
    if(!orderValid){
        res.status(401);
        res.json(`Invalid order ${id}`);
        return;
    }
    const order = await store.show(id);
    res.send(order);
}

const addProduct = async(req:Request, res:Response) => {
    const id: number = req.params.orderid as unknown as number;
    const orderValid = await store.checkOrder(id);
    if(!orderValid){
        res.status(401);
        res.json(`Invalid order ${id}`);
        return;
    }
    const order: Orders_Products = {
        quantity:req.body.quantity,
        order_id: id,
        product_id: req.body.product_id,
        id:undefined
    };
    const newOrder = await store.create(order);
    res.send(newOrder);
}

export const orders_Productsroutes = (app: Application) => {
    app.get('/orders/:orderid/products', verifyAuthToken, show);
    app.post('/orders/:orderid/products', verifyAuthToken, addProduct);
}