const request = require('supertest');
const app = require('../../app');
const { resetTestDB } = require('../unit/_config');

describe('Game Endpoints', () => {
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
        api = app.listen(4001, () => {
            console.log('Test server running on port 4001');
        });
    });

    afterAll((done) => {
        console.log('Gracefully closing server');
        api.close(done);
    });

    describe('GET /game/questions/:subjectId', () => {

        it('should return questions for a valid subject', async () => {

            const subjectId = 1;

            const response = await request(api)
                .get(`/game/questions/${subjectId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('should return 404 for an invalid subject', async () => {

            const subjectId = 999;

            const response = await request(api)
                .get(`/game/questions/${subjectId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
        });

        it('should return 403 if no token provided', async () => {

            const response = await request(api)
                .get('/game/questions/1');

            expect(response.status).toBe(403);
        });

    });

    describe('POST /game/submit', () => {

        it('should submit a quiz and return a session', async () => {

            const quizData = {
                subjectId: 1,
                score: 80,
                xpEarned: 50
            };

            const response = await request(api)
                .post('/game/submit')
                .set('Authorization', `Bearer ${token}`)
                .send(quizData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('score', 80);
            expect(response.body).toHaveProperty('xp_earned', 50);
        });

        it('should return 403 if no token provided', async () => {

            const quizData = {
                subjectId: 1,
                score: 80,
                xpEarned: 50
            };

            const response = await request(api)
                .post('/game/submit')
                .send(quizData);

            expect(response.status).toBe(403);
        });

    });

});
