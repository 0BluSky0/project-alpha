const request = require('supertest');
const app = require('../../../app');
const { resetTestDB } = require('../_config');

describe('Score Endpoints', () => {
    let api;
    let token;

    beforeEach(async () => {
        await resetTestDB();

        
        await request(api).post('/auth/signup').send({
            username: 'testuser',
            email: 'test@email.com',
            password: 'testpassword'
        });
        const loginResponse = await request(api).post('/auth/login').send({
            email: 'test@email.com',
            password: 'testpassword'
        });
        token = loginResponse.body.token;
    });

    beforeAll(() => {
        api = app.listen(4002, () => {
            console.log('Test server running on port 4002');
        });
    });

    afterAll((done) => {
        console.log('Gracefully closing server');
        api.close(done);
    });

    describe('GET /scores/leaderboard', () => {

        it('should return a list of users', async () => {
            
            const response = await request(api)
                .get('/scores/leaderboard');
            
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

    });

    describe('GET /scores/dashboard', () => {

        it('should return user data and sessions with valid token', async () => {
            
            const response = await request(api)
                .get('/scores/dashboard')
                .set('Authorization', `Bearer ${token}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('user');
            expect(response.body).toHaveProperty('sessions');
        });

        it('should return 403 if no token provided', async () => {
            
            const response = await request(api)
                .get('/scores/dashboard');
            
            expect(response.status).toBe(403);
        });

    });

});