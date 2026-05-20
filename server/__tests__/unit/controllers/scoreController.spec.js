const scoreController = require('../../../controllers/scoreController')
const User = require('../../../models/User')
const GameSession = require('../../../models/GameSession')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(() => ({ 
  send: mockSend, 
  json: mockJson, 
  end: mockEnd 
}))

const mockRes = { status: mockStatus }

describe('scoreController', () => {

  beforeEach(() => jest.clearAllMocks())
  afterAll(() => jest.resetAllMocks())

  describe('getLeaderboard', () => {

    it('should return users ordered by xp with a 200 status', async () => {

      //Arrange
      const mockUsers = [
        { id: 1, username: 'testuser', total_xp: 100, level: 2 },
        { id: 2, username: 'testuser2', total_xp: 50, level: 1 }
      ]
      jest.spyOn(User, 'getTopByXP').mockResolvedValueOnce(mockUsers)

      //Act
      await scoreController.getLeaderboard(null, mockRes)

      //Assert
      expect(User.getTopByXP).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith(mockUsers)

    })

    it('should return 500 if fetching leaderboard fails', async () => {

      //Arrange
      jest.spyOn(User, 'getTopByXP').mockRejectedValueOnce(new Error('Database error'))

      //Act
      await scoreController.getLeaderboard(null, mockRes)

      //Assert
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockJson).toHaveBeenCalledWith({ error: 'Database error' })

    })

  })

  describe('getDashboard', () => {

    it('should return user and sessions with a 200 status', async () => {

      //Arrange
      const mockReq = { user: { id: 1 } }
      const mockUser = { id: 1, username: 'testuser', email: 'test@email.com' }
      const mockSessions = [
        { id: 1, user_id: 1, subject_id: 1, score: 8, xp_earned: 50 },
        { id: 2, user_id: 1, subject_id: 2, score: 6, xp_earned: 30 }
      ]
      jest.spyOn(User, 'findById').mockResolvedValueOnce(mockUser)
      jest.spyOn(GameSession, 'getByUser').mockResolvedValueOnce(mockSessions)

      //Act
      await scoreController.getDashboard(mockReq, mockRes)

      //Assert
      expect(User.findById).toHaveBeenCalledWith(1)
      expect(GameSession.getByUser).toHaveBeenCalledWith(1)
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith({ user: mockUser, sessions: mockSessions })

    })

    it('should return 500 if fetching user fails', async () => {

      //Arrange
      const mockReq = { user: { id: 1 } }
      jest.spyOn(User, 'findById').mockRejectedValueOnce(new Error('Unable to locate user.'))

      //Act
      await scoreController.getDashboard(mockReq, mockRes)

      //Assert
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockJson).toHaveBeenCalledWith({ error: 'Unable to locate user.' })

    })

    it('should return 500 if fetching sessions fails', async () => {

      //Arrange
      const mockReq = { user: { id: 1 } }
      const mockUser = { id: 1, username: 'testuser', email: 'test@email.com' }
      jest.spyOn(User, 'findById').mockResolvedValueOnce(mockUser)
      jest.spyOn(GameSession, 'getByUser').mockRejectedValueOnce(new Error('No sessions found for this user.'))

      //Act
      await scoreController.getDashboard(mockReq, mockRes)

      //Assert
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockJson).toHaveBeenCalledWith({ error: 'No sessions found for this user.' })

    })

  })

})