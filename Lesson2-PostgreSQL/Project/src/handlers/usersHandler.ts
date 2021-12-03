import {Application, Request, Response} from 'express'
import { Users,UserStore } from '../models/users'
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../utilities/verifyJWT';

const store = new UserStore();

const create = async(req:Request, res:Response) => {
    const user: Users = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password: req.body.password,
        id:undefined
    };
    const newUser = await store.create(user);
    var token = jwt.sign({user:user}, process.env.WEB_TOKEN || '');
    res.send(`User creted with token: ${token}`);
}

const authenticate = async(req:Request, res:Response) => {
    const id:number = req.body.id;
    const password:string = req.body.password;
    const result = await store.authenticate(id,password);
    if(result === null)
        res.send('User not found');
    else
        res.send(result);
}

const index = async(req:Request, res:Response) => {
    const users = await store.index();
    res.send(users);
}

const showOrders = async(req:Request, res:Response) => {
    const id: string = req.params.id as string || '';
    const orders = await store.showOrders(id);
    res.send(orders);

}

export const users_routes = (app:Application) => {
    app.get('/users/', verifyAuthToken, index);
    app.post('/users/', verifyAuthToken, create);
    app.get('/authenticate/', verifyAuthToken, authenticate);
    app.get('/users/:id/orders', verifyAuthToken, showOrders);
}