import express, {Application, Request, Response} from 'express'
import { Users,UserStore } from '../models/users'
import jwt from 'jsonwebtoken';

const store = new UserStore();

const create = async(req:Request, res:Response) => {
    const user: Users = {
        username:req.body.username,
        password:req.body.password,
        id:undefined
    };
    console.log(user);
    const newUser = await store.create(user);
    var token = jwt.sign({user:newUser}, process.env.WEB_TOKEN || '');
    console.log(token);
    res.send(token);
}

const authenticate = async(req:Request, res:Response) => {
    const username:string = req.body.username;
    const password:string = req.body.password;

    const result = await store.authenticate(username,password);
    console.log(result);
    res.send(result);
}

export const users_routes = (app:Application) => {
    app.post('/users/', create);
    app.get('/authenticate/', authenticate);
}