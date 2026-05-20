const GameSession = require('../../../models/GameSession')
const db = require('../../../database/db')

describe('GameSession', () => {

    let mockGameSession

    beforeEach(() => {
        jest.clearAllMocks()
        mockGameSession = {
            id: 1,
            user_id: 1,
            subject_id: 1,
            score: 8,
            xp_earned: 50
        }
    })

    afterAll(() => jest.resetAllMocks())

    describe('create', () => {

        it('should create a new game session and return it', async () => {

            //Arrange
            const sessionData = { userId: 1, subjectId: 1, score: 8, xpEarned: 50 }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockGameSession] })

            //Act
            const result = await GameSession.create(sessionData.userId, sessionData.subjectId, sessionData.score, sessionData.xpEarned)

            //Assert
            expect(result).toBeInstanceOf(GameSession)
            expect(result).toHaveProperty('id', 1)
            expect(result).toHaveProperty('user_id', 1)
            expect(result).toHaveProperty('subject_id', 1)
            expect(result).toHaveProperty('score', 8)
            expect(result).toHaveProperty('xp_earned', 50)
            expect(db.query).toHaveBeenCalledWith(
                'INSERT INTO game_sessions (user_id, subject_id, score, xp_earned) VALUES ($1, $2, $3, $4) RETURNING *;',
                [sessionData.userId, sessionData.subjectId, sessionData.score, sessionData.xpEarned]
            )

        })

        it('should throw an error if the database fails', async () => {

            //Arrange
            const sessionData = { userId: 1, subjectId: 1, score: 8, xpEarned: 50 }
            jest.spyOn(db, 'query').mockRejectedValueOnce(new Error('Database error'))

            //Act & Assert
            await expect(GameSession.create(sessionData.userId, sessionData.subjectId, sessionData.score, sessionData.xpEarned))
                .rejects.toThrow('Database error')

        })

    })

    describe('getByUser', () => {

        it('should return an array of game sessions for a user', async () => {

            //Arrange
            const sessionData = { userId: 1, limit: 10 }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockGameSession] })

            //Act
            const result = await GameSession.getByUser(sessionData.userId, sessionData.limit)

            //Assert
            expect(result).toHaveLength(1)
            expect(result[0]).toBeInstanceOf(GameSession)
            expect(result[0]).toHaveProperty('id', 1)
            expect(result[0]).toHaveProperty('user_id', 1)
            expect(result[0]).toHaveProperty('subject_id', 1)
            expect(result[0]).toHaveProperty('score', 8)
            expect(result[0]).toHaveProperty('xp_earned', 50)
            expect(db.query).toHaveBeenCalledWith(
                'SELECT * FROM game_sessions WHERE user_id = $1 ORDER BY id DESC LIMIT $2;',
                [sessionData.userId, sessionData.limit]
            )

        })

        it('should throw an error if no sessions are found for the user', async () => {

            //Arrange
            const sessionData = { userId: 1, limit: 10 }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })

            //Act & Assert
            await expect(GameSession.getByUser(sessionData.userId, sessionData.limit))
                .rejects.toThrow('No sessions found for this user.')

        })

        // it('should throw an error if the database fails', async () => {

        //     //Arrange
        //     const sessionData = { userId: 1, limit: 10 }
        //     jest.spyOn(db, 'query').mockRejectedValueOnce(new Error('Database error'))

        //     //Act & Assert
        //     await expect(GameSession.getByUser(sessionData.userId, sessionData.limit))
        //         .rejects.toThrow('Database error')

        // })

    })

})