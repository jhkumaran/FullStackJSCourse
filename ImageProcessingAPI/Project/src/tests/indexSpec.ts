import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import path from 'path';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test endpoints', (): void => {
    describe('endpoint: /(valid)', (): void => {
        it('returns response for /', async (): Promise<void> => {
            const response: supertest.Response = await request.get('/');
            expect(response.status).toBe(200);
        });
    });

    describe('endpoint: /xyz(invalid)', (): void => {
        it('returns 404 for invalid endpoint', async (): Promise<void> => {
            const response: supertest.Response = await request.get('/xyz');
            expect(response.status).toBe(404);
        });
    });

    describe('endpoint: /api/images?arguments', (): void => {
        it('returns response for /api/images?filename=fjord (with filename only)', async (): Promise<void> => {
            const response: supertest.Response = await request.get('/api/images?filename=fjord');
            expect(response.status).toBe(200);
        });
    
        it('returns response for /api/images?filename=fjord&width=199&height=199 (with filename, valid height and width arguments)', async (): Promise<void> => {
            const response: supertest.Response = await request.get('/api/images?filename=fjord&width=199&height=199');
            expect(response.status).toBe(200);
        });
    
        it('returns response for /api/images?filename=fjord&width=-200&height=200 (with filename, invalid height and width arguments)', async (): Promise<void> => {
            const response: supertest.Response = await request.get('/api/images?filename=fjord&width=-200&height=200');
            expect(response.status).toBe(200);
        });
    
        it('returns response for /api/images (with no arguments)', async (): Promise<void> => {
            const response: supertest.Response = await request.get('/api/images');
            expect(response.status).toBe(200);
        });
      });
});

afterAll(async(): Promise<void> => {
    let imagesThumbPath:string = path.resolve(__dirname, '../../assets/images/thumb');
    let resizedImagePath: string = path.resolve(imagesThumbPath,'fjord_199x199.jpg');
    try {
        await fs.access(resizedImagePath);
        fs.unlink(resizedImagePath);
    } catch {
        console.log('Error while deleting files');
    }
})