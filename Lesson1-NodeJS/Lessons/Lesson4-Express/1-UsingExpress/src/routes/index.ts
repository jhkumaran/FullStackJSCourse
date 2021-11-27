import express from 'express';
import teachers from './api/teachers';
import students from './api/students';
const routes = express.Router();


routes.get('/', (req,res) => {
    res.send('main api route');
});
routes.use('/teachers',teachers);
routes.use('/students',students);
export default routes;