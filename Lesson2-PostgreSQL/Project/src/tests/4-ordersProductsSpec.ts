import supertest from 'supertest';
import app from '../server';
import { Orders_Products, Orders_ProductsStore } from '../models/orders_products';

const store = new Orders_ProductsStore();
const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Orders_Products endpoints:', (): void => {
    let token: string;
    beforeAll(async() => {
        token = process.env.TOKEN_TEST || '';
    });

    it('returns 401 response for get products in order /orders/:orderid/products without valid token', async() => {
        const response: supertest.Response = await request.get('/orders/1/products');
        expect(response.status).toBe(401);
    });

    it('returns response for get products in order /orders/:orderid/products with valid token', async() => {
        const response: supertest.Response = await request.get('/orders/1/products').set("Authorization", token);
        expect(response.status).toBe(200);
    });

    it('returns 401 response for adding products in order /orders/:orderid/products without valid token', async() => {
        const response: supertest.Response = await request.get('/orders/1/products').send({
            quantity:1,
            order_id: 1,
            product_id: 1
        });
        expect(response.status).toBe(401);
    });

    it('returns response for adding products in order /orders/:orderid/products with valid token', async() => {
        const response: supertest.Response = await request.get('/orders/1/products').send({
            quantity:1,
            order_id: 1,
            product_id: 1
        }).set("Authorization", token);
        expect(response.status).toBe(200);
    });
});

describe('Orders_Products Model Tests: ', () => {
    it('show method to be defined', () => {
        expect(store.show).toBeDefined();
    });

    it('checkOrder method to be defined', () => {
        expect(store.checkOrder).toBeDefined();
    });

    it('create method to be defined', () => {
        expect(store.create).toBeDefined();
    });

    it('checkOrder method to return false for invalid order id', async() => {
        const isValid = await store.checkOrder(0);
        expect(isValid).toBeFalse();
    });

    it('checkOrder method to return true for valid order id', async() => {
        const isValid = await store.checkOrder(1);
        expect(isValid).toBeTrue();
    });

    it('create method to add product into order', async() => {
        const p: Orders_Products = {
            id: undefined, order_id: 1, product_id: 1, quantity: 1
        };
        const res = await store.create(p);
        expect(res).toBeTruthy();
    });

    it('show method to return products added to the order', async() => {
        const result = await store.show(1);
        expect(result.length).toBeGreaterThanOrEqual(0);
    })
});