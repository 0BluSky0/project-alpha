const subjectController = require('../../../controllers/subjectController')
const Subject = require('../../../models/Subject')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(() => ({
  send: mockSend,
  json: mockJson,
  end: mockEnd
}))

const mockRes = { status: mockStatus }

describe('subjectController', () => {

    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe('getAll', () => {

        it('should return all subjects with a 200 status', async () => {

            //Arrange
            const mockReq = {}
            const mockSubjects = [
                { id: 1, name: 'Ancient Egypt' },
                { id: 2, name: 'Ancient Greece' }
            ]
            jest.spyOn(Subject, 'getAll').mockResolvedValueOnce(mockSubjects)

            //Act
            await subjectController.getAll(mockReq, mockRes)

            //Assert
            expect(Subject.getAll).toHaveBeenCalledTimes(1)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith(mockSubjects)

        })

        it('should return 500 if fetching subjects fails', async () => {

            //Arrange
            const mockReq = {}
            jest.spyOn(Subject, 'getAll').mockRejectedValueOnce(new Error('No subjects available.'))

            //Act
            await subjectController.getAll(mockReq, mockRes)

            //Assert
            expect(mockStatus).toHaveBeenCalledWith(500)
            expect(mockJson).toHaveBeenCalledWith({ error: 'No subjects available.' })

        })

    })

})