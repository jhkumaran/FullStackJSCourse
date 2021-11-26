import express from 'express';
import images from './api/image';
import {getAvailableImageNames, getMessage} from '../utils';

const routes = express.Router();

routes.use('/api/images', images);

routes.get(
    '/',
    async(
        request: express.Request,
        response: express.Response
    ): Promise<void> => {
        const availableImageNames: string = (
            await getAvailableImageNames()
        ).join(', ');
        console.log(availableImageNames);
        response.send(getMessage(availableImageNames));
    }
);

export default routes;