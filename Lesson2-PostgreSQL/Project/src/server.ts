import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import { users_routes } from './handlers/usersHandler';
import { products_routes } from './handlers/productsHandler';
import { orders_routes } from './handlers/ordersHandler';
import { orders_Productsroutes } from './handlers/orders_productsHandler';
import jwt from 'jsonwebtoken';
import { Users } from './models/users'

const app: express.Application = express();
const address:string = "3000";

app.use(bodyParser.json());

app.get('/', function(req: Request, res: Response){
    const user: Users = {
        firstname:'Admin first name',
        lastname:'Admin last name',
        password: process.env.ADMIN_PWD,
        id:undefined
    };
    var token = jwt.sign({user:user}, process.env.WEB_TOKEN || '');
    res.send(`Admin token: ${token}`);
});

users_routes(app);
products_routes(app);
orders_routes(app);
orders_Productsroutes(app);

app.listen(3000, function(){
    console.log(`starting app on: http://localhost:${address}`);
});

export default app;