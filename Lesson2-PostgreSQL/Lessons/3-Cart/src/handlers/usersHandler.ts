import {Application, Request, Response} from 'express'
import { Users,UserStore } from '../models/users'

const store = new UserStore();

const create = async(req:Request, res:Response) => {
    const user: Users = {
        name:req.body.name,
        id:undefined
    };
    console.log(user);
    const newUser = await store.create(user);
    res.send(newUser);
}

const index = async(req:Request, res:Response) => {
    const users = await store.index();
    res.send(users);
}

const showOrders = async(req:Request, res:Response) => {
    const id: string = req.params.id as string || '';
    console.log(id);
    const orders = await store.showOrders(id);
    res.send(orders);

}

export const users_routes = (app:Application) => {
    app.get('/users/', index);
    app.post('/users/', create);
    app.get('/users/:id/orders', showOrders);
}