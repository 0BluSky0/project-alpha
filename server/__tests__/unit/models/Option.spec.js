const Option = require('../../../models/Option')
const db = require('../../../database/db')

describe ('Option', () => {

    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe ('getByQuestion', () => {

        it('should get options by question id', async () => {

            //Arrange
            const optionData = {questionId: 1}
            const mockOption = {
                id: 1,
                question_id: 1,
                option_text: 'exampleOption',
                is_correct: true
            }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockOption]})

            //Act
            const result = await Option.getByQuestion(optionData.questionId)

            //Assert
            expect(result).toHaveLength(1)
            expect(result[0]).toBeInstanceOf(Option)
            expect(result[0]).toHaveProperty('question_id', 1)
            expect(db.query).toHaveBeenCalledWith(
                'SELECT * FROM options WHERE question_id = $1;',
                [optionData.questionId]
            )

        })

        it('should throw an error if no options are found for the question', async () => {

            //Arrange
            const optionData = { questionId: 1 }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })

            //Act & Assert
            await expect(Option.getByQuestion(optionData.questionId))
                .rejects.toThrow('No options available for this question.')

        })

    })

})