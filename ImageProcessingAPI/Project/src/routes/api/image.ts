import express from 'express';
import {getAvailableImageNames, getFilePath, checkThumbAvailable, createThumbFile, getMessage} from '../../utils';

const imageRouter = express.Router();

imageRouter.get(
    '/',
    async(
        request: express.Request,
        response: express.Response
    ): Promise<void> => {
        const availableImageNames: string = (
            await getAvailableImageNames()
        ).join(', ');
        const filename: string = request.query.filename as string || '';
        const height: string = request.query.height as string || '';
        const width: string = request.query.width as string || '';
        if(!availableImageNames.includes(filename) || filename === '')
        {
            response.send(getMessage(availableImageNames));
        }else{
            let thumbAvailable = await checkThumbAvailable(filename, height, width);
            if((height !== '' &&  width === '') || (height === '' && width !== '')){
                response.send('Please enter both height and width values');
            }
            if(height !== '' && width !== '' && !thumbAvailable){
                let fileCreated:string = await createThumbFile(filename, parseInt(height), parseInt(width));
                if(fileCreated !== ''){
                    response.send(fileCreated)
                }
            }
            const filePath : string = await getFilePath(filename, height, width) as string;
            if(filePath == ''){
                response.send(getMessage(availableImageNames));
            }else{
                response.sendFile(filePath);
            }
        }
    }
);

export default imageRouter;