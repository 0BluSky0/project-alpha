const gameController = require('../../../controllers/gameController')
const Question = require('../../../models/Question')
const Option = require('../../../models/Option')
const GameSession = require('../../../models/GameSession')
const User = require('../../../models/User')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd
}))

const mockRes = { status: mockStatus }

describe('gameController', () => {

    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe('getQuestions', () => {

        it('should return 200 with questions and their options', async () => {

            //Arrange
            const mockReq = { params: { subjectId: '1' } }
            const mockQuestions = [
                { id: 1, subject_id: 1, question_text: 'What year did WW2 end?', question_type: 'multiple_choice' },
                { id: 2, subject_id: 1, question_text: 'Was Napoleon short?', question_type: 'true_false' }
            ]
            const mockOptions1 = [
                { id: 1, question_id: 1, option_text: '1945', is_correct: true },
                { id: 2, question_id: 1, option_text: '1939', is_correct: false }
            ]
            const mockOptions2 = [
                { id: 3, question_id: 2, option_text: 'True', is_correct: false },
                { id: 4, question_id: 2, option_text: 'False', is_correct: true }
            ]
            jest.spyOn(Question, 'getBySubject').mockResolvedValueOnce(mockQuestions)
            jest.spyOn(Option, 'getByQuestion')
                .mockResolvedValueOnce(mockOptions1)
                .mockResolvedValueOnce(mockOptions2)

            //Act
            await gameController.getQuestions(mockReq, mockRes)

            //Assert
            expect(Question.getBySubject).toHaveBeenCalledWith(1)
            expect(Option.getByQuestion).toHaveBeenCalledWith(1)
            expect(Option.getByQuestion).toHaveBeenCalledWith(2)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith([
                { ...mockQuestions[0], options: mockOptions1 },
                { ...mockQuestions[1], options: mockOptions2 }
            ])

        })

        it('should return 404 if questions cannot be found', async () => {

            //Arrange
            const mockReq = { params: { subjectId: '99' } }
            jest.spyOn(Question, 'getBySubject').mockRejectedValueOnce(new Error('No questions found.'))

            //Act
            await gameController.getQuestions(mockReq, mockRes)

            //Assert
            expect(mockStatus).toHaveBeenCalledWith(404)
            expect(mockJson).toHaveBeenCalledWith({ error: 'No questions found.' })

        })

    })


    describe('submitQuiz', () => {

        it('should return 201 with the game session after submitting a quiz', async () => {

            //Arrange
            const mockReq = {
                body: { subjectId: 1, score: 8, xpEarned: 50 },
                user: { id: 1 }
            }
            const mockSession = { id: 1, user_id: 1, subject_id: 1, score: 8, xp_earned: 50 }
            const mockUser = { id: 1, total_xp: 50, level: 2 }
            jest.spyOn(GameSession, 'create').mockResolvedValueOnce(mockSession)
            jest.spyOn(User, 'addXP').mockResolvedValueOnce(mockUser)

            //Act
            await gameController.submitQuiz(mockReq, mockRes)

            //Assert
            expect(GameSession.create).toHaveBeenCalledWith(1, 1, 8, 50)
            expect(User.addXP).toHaveBeenCalledWith(1, 50)
            expect(mockStatus).toHaveBeenCalledWith(201)
            expect(mockJson).toHaveBeenCalledWith(mockSession)

        })

        it('should return 400 if quiz submission fails', async () => {

            //Arrange
            const mockReq = {
                body: { subjectId: 1, score: 8, xpEarned: 50 },
                user: { id: 1 }
            }
            jest.spyOn(GameSession, 'create').mockRejectedValueOnce(new Error('Could not save session.'))

            //Act
            await gameController.submitQuiz(mockReq, mockRes)

            //Assert
            expect(mockStatus).toHaveBeenCalledWith(400)
            expect(mockJson).toHaveBeenCalledWith({ error: 'Could not save session.' })

        })

    })

})