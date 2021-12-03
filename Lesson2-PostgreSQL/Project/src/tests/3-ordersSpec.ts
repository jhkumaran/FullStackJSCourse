import supertest from 'supertest';
import app from '../server';
import { Orders, OrdersStore } from '../models/orders';

const store = new OrdersStore();
const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Orders endpoints:', (): void => {
    let token: string;
    beforeAll(async() => {
        token = process.env.TOKEN_TEST || '';
    });

    it('returns 401 response for get orders /orders/ without valid token', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/orders/');
        expect(response.status).toBe(401);
    });

    it('returns response for get orders /orders/ with valid token', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/orders/').set("Authorization", token);
        expect(response.status).toBe(200);
    });

    it('returns 401 response for get orders /orders/ without valid token', async (): Promise<void> => {
        const response: supertest.Response = await request.post('/orders/').send({
            status: 'new', user_id: 1
        });
        expect(response.status).toBe(401);
    });

    it('returns response for get orders /orders/ with valid token', async (): Promise<void> => {
        const response: supertest.Response = await request.post('/orders/').send({
            status: 'new', user_id: '1'
        }).set("Authorization", token);
        expect(response.status).toBe(200);
    });

    it('returns 401 response for get orders that matches orderid /orders/:id without valid token', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/orders/1');
        expect(response.status).toBe(401);
    });

    it('returns response for get orders that matches orderid /orders/:id with valid token', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/orders/1').set("Authorization", token);
        expect(response.status).toBe(200);
    });
});

describe('Products Model Tests: ', () => {
    it('index method to be defined', () => {
        expect(store.index).toBeDefined();
    });

    it('create method to be defined', () => {
        expect(store.create).toBeDefined();
    });

    it('show method to be defined', () => {
        expect(store.show).toBeDefined();
    });

    it('index method returns a list of orders', async() => {
        const orders = await store.index();
        expect(orders.length).toBeGreaterThanOrEqual(0);
    });

    it('create method creates a product', async() => {
        const order: Orders = {
            status:'new', user_id:1, id: undefined
        }
        const newOrder = await store.create(order);
        expect(newOrder).toBeTruthy();
    });

    it('show method returns a order that matches the order id', async() => {
        const order = await store.show('1');
        expect(order).toBeTruthy();
    });
});