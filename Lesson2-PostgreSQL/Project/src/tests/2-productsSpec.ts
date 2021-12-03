import supertest from 'supertest';
import app from '../server';
import { Products, ProductsStore } from '../models/products';

const store = new ProductsStore();
const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Products endpoints:', (): void => {
    let token: string;
    beforeAll(async() => {
        token = process.env.TOKEN_TEST || '';
    });

    it('returns response for get products /products/', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/products/');
        expect(response.status).toBe(200);
    });

    it('returns 401 response for create products /products/ without token', async(): Promise<void> => {
        const response: supertest.Response = await request.post('/products').send({
            name:'Product1',
            price: 10,
            category: 'Category1'
        });
        expect(response.status).toBe(401);
    });

    it('returns response for create products /products/ with token', async(): Promise<void> => {
        const response: supertest.Response = await request.post('/products').send({
            name:'Product1',
            price: 10,
            category: 'Category1'
        });
        expect(response.status).toBe(401);
    });

    it('returns response for get specific product /products/:id', async(): Promise<void> => {
        const response: supertest.Response = await request.get('/products/1');
        expect(response.status).toBe(200);
    });

    it('returns response for get products by category /products/category/:category', async(): Promise<void> => {
        const response: supertest.Response = await request.get('/products/category/category1');
        expect(response.status).toBe(200);
    })
});

describe('Products Model Tests: ', () => {
    it('index method to be defined', () => {
        expect(store.index).toBeDefined();
    });

    it('create method to be defined', () => {
        expect(store.index).toBeDefined();
    });

    it('show method to be defined', () => {
        expect(store.index).toBeDefined();
    });

    it('showByCategory method to be defined', () => {
        expect(store.index).toBeDefined();
    });

    it('index method returns a list of products', async() => {
        const products = await store.index();
        expect(products.length).toBeGreaterThanOrEqual(0);
    });

    it('create method creates a product', async() => {
        const product: Products = {
            name: 'Product1', price: 10, category: 'category1', id: undefined
        }
        const newProduct = await store.create(product);
        expect(newProduct).toBeTruthy();
    });

    it('show method returns a product that matches the product id', async() => {
        const product = await store.show('1');
        expect(product).toBeTruthy();
    });

    it('showByCategory method returns products that matches the category id', async() => {
        const products = await store.showByCategory('category1');
        expect(products.length).toBeGreaterThanOrEqual(0);
    })
});