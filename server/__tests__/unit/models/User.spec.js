const User = require('../../../models/User')
const db = require('../../../database/db')

describe('User', () => {

    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe ('create', () => {

        it('should create a new user and return them', async () => {

            // Arrange
            const userData = {username: 'testuser', email: 'test@email.com', hashedPassword: 'testhashedpassword'}
            const mockUser = { 
                id: 1, 
                username: 'testuser', 
                email: 'test@email.com', 
                password_hash: 'testhashedpassword',
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
            expect(result).toHaveProperty('username', 'testuser')
            expect(result).toHaveProperty('email', 'test@email.com')
            expect(result).toHaveProperty('password_hash', 'testhashedpassword')
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *;",
                [userData.username, userData.email, userData.hashedPassword]
            )

        })

        it('should throw an Error when no User is created', async () => {

            //Arrange
            const userData = {username: 'testuser', email: 'test@email.com', hashedPassword: 'testhashedpassword'}
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})

            //Act & Assert
            await expect (User.create(userData.username, userData.email, userData.hashedPassword))
            .rejects.toThrow('User could not be created.')

        })

    })

})