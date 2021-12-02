import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import books_routes from './handlers/booksHandler';
import { users_routes } from './handlers/usersHandler';

const app: express.Application = express();
const address:string = "3000";

app.use(bodyParser.json());

app.get('/', function(req: Request, res: Response){
    res.send('Hello world');
});

books_routes(app);
users_routes(app);

app.listen(3000, function(){
    console.log(`starting app on: http://localhost:${address}`);
});