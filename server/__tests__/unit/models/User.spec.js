const User = require('../../../models/User')
const db = require('../../../database/db')

describe('User', () => {

    let mockUser

    beforeEach(() => {
        jest.clearAllMocks()
        mockUser = {
            id: 1, 
            username: 'testuser', 
            email: 'test@email.com', 
            password_hash: 'testhashedpassword',
            role: 'student',
            total_xp: 0,
            level: 1,
            colour_scheme: 'light',
            created_at: new Date()
        }
    })

    afterAll(() => jest.resetAllMocks())

    describe ('create', () => {

        it('should create a new user and return them', async () => {

            // Arrange
            const userData = {username: 'testuser', email: 'test@email.com', hashedPassword: 'testhashedpassword'}
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


    describe ('findByEmail', () => {

        it('should find the user by email and return them', async () => {
            
            //Arrange
            const userData = {email: 'test@email.com'}
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockUser] })

            //Act
            const result = await User.findByEmail(userData.email)

            //Assert
            expect(result).toBeInstanceOf(User)
            expect(result).toHaveProperty('email', 'test@email.com')
            expect(db.query).toHaveBeenCalledWith(
                "SELECT * FROM users WHERE email = $1;",
                [userData.email]
            )
            
        })

        it('should throw an error if cannot locate user', async () => {

            //Arrange
            const userData = {email: 'test@email.com'}
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows:[] })

            //Act & Assert
            await expect(User.findByEmail(userData.email))
            .rejects.toThrow('Unable to locate user.')

        })

    })

    
    describe ('findById', () => {

        it('should find user by id and return them', async () => {

            //Arrange
            const userData = {id: 1}
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockUser] })

            //Act
            const result = await User.findById(userData.id)

            //Assert
            expect(result).toBeInstanceOf(User)
            expect(result).toHaveProperty('id', 1)
            expect(db.query).toHaveBeenCalledWith(
                "SELECT * FROM users WHERE id = $1;",
                [userData.id]
            )

        })

        it('should throw an error if cannot locate user', async () => {

            //Arrange
            const userData = {id: 1}
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows:[] })

            //Act & Assert
            await expect(User.findById(userData.id))
            .rejects.toThrow('Unable to locate user.')

        })

    })


    describe ('addXP', () => {

        it('should add xp points and return the result', async () => {

            //Arrange
            const userData = {userId: '1', xpToAdd: '5'}
            const updatedMockUser = {...mockUser, total_xp: 5, level: 1}
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows:[updatedMockUser] })

            //Act
            const result = await User.addXP(userData.userId, userData.xpToAdd)

            //Assert
            expect(result).toBeInstanceOf(User)
            expect(result).toHaveProperty('id', 1)
            expect(result).toHaveProperty('total_xp', 5)
            expect(db.query).toHaveBeenCalledWith(
      `UPDATE users
       SET total_xp = total_xp + $2,
           level = CASE
             WHEN total_xp + $2 >= 500 THEN 5
             WHEN total_xp + $2 >= 300 THEN 4
             WHEN total_xp + $2 >= 150 THEN 3
             WHEN total_xp + $2 >= 50  THEN 2
             ELSE 1
           END
       WHERE id = $1
       RETURNING *;`,
                [userData.userId, userData.xpToAdd]
            )

        })

        it('should throw an error if cannot update xp', async () => {

            //Arrange
            const userData = {userId: '1', xpToAdd: '5'}
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows:[] })

            //Act & Assert
            await expect(User.addXP(userData.userId, userData.xpToAdd))
            .rejects.toThrow('Unable to update XP.')

        })

    })


    describe ('getTopByXP', () => {

        it('should return users ordered by xp desc', async () => {

            //Arrange
            const userData = {limit: 10}
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockUser] })

            //Act
            const result = await User.getTopByXP(userData.limit)

            //Assert
            expect(result).toHaveLength(1)
            expect(result[0]).toBeInstanceOf(User)
            expect(result[0]).toHaveProperty('id', 1)
            expect(db.query).toHaveBeenCalledWith(
                "SELECT id, username, total_xp, level FROM users ORDER BY total_xp DESC LIMIT $1;",
                [userData.limit]
            )

        })

    })


    describe ('updateColourScheme', () => {

        it('should update colour scheme and return the user', async () => {

            //Arrange
            const userData = { userId: 1, colourScheme: 'dark' }
            const updatedMockUser = { ...mockUser, colour_scheme: 'dark' }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [updatedMockUser] })

            //Act
            const result = await User.updateColourScheme(userData.userId, userData.colourScheme)

            //Assert
            expect(result).toBeInstanceOf(User)
            expect(result).toHaveProperty('colour_scheme', 'dark')
            expect(db.query).toHaveBeenCalledWith(
                'UPDATE users SET colour_scheme = $2 WHERE id = $1 RETURNING *;',
                [userData.userId, userData.colourScheme]
            )

        })

        it('should throw an error if colour scheme cannot be updated', async () => {

            //Arrange
            const userData = { userId: 1, colourScheme: 'dark' }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })

            //Act & Assert
            await expect(User.updateColourScheme(userData.userId, userData.colourScheme))
            .rejects.toThrow('Unable to update colour scheme.')

        })

    })

})