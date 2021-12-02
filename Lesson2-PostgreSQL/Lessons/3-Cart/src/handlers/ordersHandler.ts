import { Application, Request, Response } from "express";
import { Orders, OrdersStore } from "../models/orders";

const store = new OrdersStore();

const index = async(req:Request, res:Response) => {
    const orders = await store.index();
    res.send(orders);
}

const show = async(req:Request, res:Response) => {
    const id: string = req.params.id as string || '';
    console.log(id);
    const order = await store.show(id);
    res.send(order);
}

const create = async(req:Request, res:Response) => {
    const order: Orders = {
        status:req.body.status,
        user_id: req.body.user_id,
        id:undefined
    };
    console.log(order);
    const newOrder = await store.create(order);
    res.send(newOrder);
}

export const orders_routes = (app: Application) => {
    app.get('/orders',index);
    app.get('/orders/:id',show);
    app.post('/orders', create);
}