const User = require('../../../models/User')
const db = require('../../../database/db')

describe('User', () => {

    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe ('create', () => {

        it('should create a new user and return them', async () => {

            const userData = {username: 'testUser', email: 'test@email.com', hashedPassword: 'testHashedPassword'}
            const mockUser = { 
                id: 1, 
                username: 'testuser', 
                email: 'test@email.com', 
                password_hash: 'hashedpassword123',
                role: 'student',
                total_xp: 0,
                level: 1,
                created_at: new Date()
            }

            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockUser]})

            // Act
            const result = await User.create(userData.username, userData.email, userData.hashedPassword)

            //Assert
            expect(result).toBeInstanceOf(User);

        })

    })

})