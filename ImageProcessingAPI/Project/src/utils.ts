import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp'

const imagesFullPath = path.resolve(__dirname, '../assets/images/full');
const imagesThumbPath = path.resolve(__dirname, '../assets/images/thumb');

export const getAvailableImageNames = async(): Promise<string[]> => {
    try {
        return (await fs.readdir(imagesFullPath)).map(
            (filename: string): string => filename.split('.')[0]
        );
    } catch {
      return [];
    }
}

export const isImageAvailable = async(filename: string = ''): Promise<boolean> => {
    if (!filename) {
      return false; // Fail early
    }

    return (await getAvailableImageNames()).includes(filename);
}

export const getFilePath = async(filename: string = '', height: string = '', width: string = ''): Promise<string> => {
    let filePath: string = '';

    filePath = height === '' && width === '' ? path.resolve(imagesFullPath, `${filename}.jpg`) :
    path.resolve(imagesThumbPath, `${filename}_${height}x${width}.jpg`);

    try {
        await fs.access(filePath);
        return filePath;
    } catch {
        return filePath;
    }
}

export const checkThumbAvailable = async(filename: string = '', height: string = '', width: string = ''): Promise<boolean> => {
    if(height === '' || width === '') return false;
    let filePath: string = path.resolve(imagesThumbPath, `${filename}_${height}x${width}.jpg`);
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

export const createThumbFile = async(filename: string = '', height: number = 0, width: number = 0): Promise<string> => {
    let fullPath: string = path.resolve(imagesFullPath, `${filename}.jpg`);
    let thumbPath: string = path.resolve(imagesThumbPath, `${filename}_${height}x${width}.jpg`);
    if(height <= 0 || width <= 0 || isNaN(height) || isNaN(width)){
        return 'Please provide valid values for height and width';
    }
    await createThumbPath();
    try{
        await sharp(fullPath)
            .resize(width, height)
            .toFormat('jpeg')
            .toFile(thumbPath);
            return '';
    }catch{
        return 'Error while creating thumb';
    }
}

const createThumbPath = async(): Promise<void> =>{
    try {
      await fs.access(imagesThumbPath);
    } catch {
      fs.mkdir(imagesThumbPath);
    }
  }

export const getMessage = (availableImageNames: string = ''): string => {
    let message: string = '';
    message = `
        <p>Please provide a valid filename(with height and width parameters if needed to be compressed).</p>
        <p>Available filenames are: ${availableImageNames}.
        <p>eg: 
            <ul>
                <li>
                    <a href="/api/images?filename=fjord">
                        http://localhost:3000/api/images/?filename=fjord
                    </a>
                </li>
                <li>
                    <a href="/api/images?filename=fjord&height=100&width=100">
                        http://localhost:3000/api/images/?filename=fjord&height=100&width=100
                    </a>
                </li>
            </ul>
        </p>`
    return message;
}