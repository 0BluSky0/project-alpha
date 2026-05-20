const request = require('supertest');
const app = require('../../../app');
const { resetTestDB } = require('../_config'); 

describe('Auth Endpoints', () => {
    let api;

    beforeEach(async () => {
        await resetTestDB();
    });

    beforeAll(() => {
        api = app.listen(4000, () => {
            console.log('Test server running on port 4000');
        });
    });

    afterAll((done) => {
        console.log('Gracefully closing server');
        api.close(done);
    });

    describe('POST /auth/signup', () => {

        it('should create a new user and return 201', async () => {
            
            const userData = {
                username: 'testuser',
                email: 'test@email.com',
                password: 'testpassword'
            };
            
            const response = await request(api)
                .post('/auth/signup')
                .send(userData);
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('email', 'test@email.com');
            expect(response.body).toHaveProperty('username', 'testuser');
        });

        it('should return 400 if email already exists', async () => {
            
            const userData = {
                username: 'testuser',
                email: 'test@email.com',
                password: 'testpassword'
            };
            await request(api).post('/auth/signup').send(userData);
            
            const response = await request(api)
                .post('/auth/signup')
                .send(userData);
            
            expect(response.status).toBe(400);
        });

    });

    describe('POST /auth/login', () => {

        it('should login and return a token', async () => {
            
            const userData = {
                username: 'testuser',
                email: 'test@email.com',
                password: 'testpassword'
            };
            await request(api).post('/auth/signup').send(userData);
            
            const response = await request(api)
                .post('/auth/login')
                .send({ email: 'test@email.com', password: 'testpassword' });
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body.success).toBe(true);
        });

        it('should return 400 with wrong password', async () => {
            
            const userData = {
                username: 'testuser',
                email: 'test@email.com',
                password: 'testpassword'
            };
            await request(api).post('/auth/signup').send(userData);
            
            const response = await request(api)
                .post('/auth/login')
                .send({ email: 'test@email.com', password: 'wrongpassword' });
        
            expect(response.status).toBe(400);
        });

    });

});