const authController = require('../../../controllers/authController')
const User = require('../../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(() => ({ 
  send: mockSend, 
  json: mockJson, 
  end: mockEnd 
}))

const mockRes = { status: mockStatus }

describe ('authController', () => {

    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe ('register', () => {

        it('should register a new user and return 201', async () => {

            //Arrange
            const mockReq = {body: {username: 'test-user', email: 'test@email.com', password: 'test-password'}}
            const mockUser = {id:1, username: 'test-user', email: 'test@email.com'}
            jest.spyOn(bcrypt, 'genSalt').mockResolvedValueOnce('fake-salt')
            jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('fake-hashed-password')
            jest.spyOn(User, 'create').mockResolvedValue(mockUser)

            //Act
            await authController.register(mockReq, mockRes)
            
            //Assert
            expect(bcrypt.genSalt).toHaveBeenCalledTimes(1)
            expect(bcrypt.hash).toHaveBeenCalledWith('test-password', 'fake-salt')
            expect(User.create).toHaveBeenCalledWith('test-user', 'test@email.com', 'fake-hashed-password')
            expect(mockStatus).toHaveBeenCalledWith(201)
            expect(mockJson).toHaveBeenCalledWith(mockUser)
        })

        it('should return 400 if registration fails', async () => {

            // Arrange
            const mockReq = { body: { username: 'test-user', email: 'test@email.com', password: 'test-password' } }
            jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('fakeSalt')
            jest.spyOn(bcrypt, 'hash').mockResolvedValue('fake-hashed-password')
            jest.spyOn(User, 'create').mockRejectedValue(new Error('User could not be created.'))

            // Act
            await authController.register(mockReq, mockRes)

            // Assert
            expect(mockStatus).toHaveBeenCalledWith(400)
            expect(mockJson).toHaveBeenCalledWith({ error: 'User could not be created.' })
        })

    })


    describe('login', () => {

        it('should login a user and return 200 with a token', async () => {

            //Arrange
            const mockReq = { body: { email: 'test@email.com', password: 'test-password' } }
            const mockUser = { id: 1, email: 'test@email.com', password_hash: 'fake-hashed-password', role: 'student' }
            jest.spyOn(User, 'findByEmail').mockResolvedValueOnce(mockUser)
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true)
            jest.spyOn(jwt, 'sign').mockImplementation((payload, secret, options, callback) => {
                callback(null, 'fake-token')
            })

            //Act
            await authController.login(mockReq, mockRes)

            //Assert
            expect(User.findByEmail).toHaveBeenCalledWith('test@email.com')
            expect(bcrypt.compare).toHaveBeenCalledWith('test-password', 'fake-hashed-password')
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith({ success: true, token: 'fake-token' })

        })

        it('should return 400 if password does not match', async () => {

            //Arrange
            const mockReq = { body: { email: 'test@email.com', password: 'wrong-password' } }
            const mockUser = { id: 1, email: 'test@email.com', password_hash: 'fake-hashed-password', role: 'student' }
            jest.spyOn(User, 'findByEmail').mockResolvedValueOnce(mockUser)
            jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false)

            //Act
            await authController.login(mockReq, mockRes)

            //Assert
            expect(mockStatus).toHaveBeenCalledWith(400)
            expect(mockJson).toHaveBeenCalledWith({ error: 'User could not be authenticated' })

        })

        it('should return 400 if user is not found', async () => {

            //Arrange
            const mockReq = { body: { email: 'test@email.com', password: 'test-password' } }
            jest.spyOn(User, 'findByEmail').mockRejectedValueOnce(new Error('Unable to locate user.'))

            //Act
            await authController.login(mockReq, mockRes)

            //Assert
            expect(mockStatus).toHaveBeenCalledWith(400)
            expect(mockJson).toHaveBeenCalledWith({ error: 'Unable to locate user.' })

        })

    })    

})