import supertest from 'supertest';
import app from '../server';
import { Users, UserStore } from "../models/users";

const store = new UserStore();
const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('User endpoints:', (): void => {
    let token: string;
    beforeAll(async() => {
        token = process.env.TOKEN_TEST || '';
    });

    it('returns response for home /', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/');
        expect(response.status).toBe(200);
    });

    it('returns 401 response for getusers /users/ without token', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/users/');
        expect(response.status).toBe(401);
    });

    it('returns response for getusers /users/', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/users/').set("Authorization", token);
        expect(response.status).toBe(200);
    });

    it('returns 401 response for postuser /users/ without token', async (): Promise<void> => {
        const response: supertest.Response = await request.post('/users/').send({
            firstname:'abcd',
            lastname:'xyz',
            password:'Password123'
        });
        expect(response.status).toBe(401);
    });

    it('returns response for postuser /users/ with token', async (): Promise<void> => {
        const response: supertest.Response = await request.post('/users/').send({
            firstname:'abcd',
            lastname:'xyz',
            password:'Password123'
        }).set("Authorization", token);
        expect(response.status).toBe(200);
    });

    it('returns 401 response for /authenticate/ without token', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/authenticate/').send({
            id:1,
            password:'Password123'
        });
        expect(response.status).toBe(401);
    });

    it('returns response for /authenticate/ with token', async (): Promise<void> => {
        const response: supertest.Response = await request.get('/authenticate/').set("Authorization", token).send({
            id:1,
            password:'Password123'
        });
        expect(response.status).toBe(200);
    });
});

describe('User Model Tests: ', () => {
    it('index method to be defined', () => {
        expect(store.index).toBeDefined();
    });

    it('create method to be defined', () => {
        expect(store.index).toBeDefined();
    });

    it('authenticate method to be defined', () => {
        expect(store.index).toBeDefined();
    });

    it('index method returns list of users', async() => {
        const users = await store.index();
        expect(users.length).toBeGreaterThan(0);
    });

    it('create method creates a user', async() => {
        const user: Users = {
            firstname:'abcd',
            lastname:'xyz',
            password: 'Password123',
            id:undefined
        };
        const newUser = await store.create(user);
        expect(newUser).toBeTruthy();
    });

    it('authenticate method return false for invalid user', async() => {
        const user = await store.authenticate(100,'ABCD');
        expect(user).toBeFalsy();
    });

    it('authenticate method return true for valid user', async() => {
        const user = await store.authenticate(2,'Password123');
        expect(user).toBeTruthy();
    });
});