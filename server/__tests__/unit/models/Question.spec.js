const Question = require('../../../models/Question')
const db = require('../../../database/db')

describe ('Question', () => {

    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe ('getBySubject', () => {

        it('should get question by subject id', async () => {

            //Arrange
            const questionData = {subjectId: 1, limit: 10}
            const mockQuestion = {
                id: 1,
                subject_id: 1,
                question_text: 'exampleQuestion',
                question_type: 'exampleType',
                difficulty: 1,
                created_by: 'exampleName' 
            }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [mockQuestion]})

            //Act
            const result = await Question.getBySubject(questionData.subjectId, questionData.limit)

            //Assert
            expect(result).toHaveLength(1)
            expect(result[0]).toBeInstanceOf(Question)
            expect(result[0]).toHaveProperty('subject_id', 1)
            expect(db.query).toHaveBeenCalledWith(
                'SELECT * FROM questions WHERE subject_id = $1 ORDER BY RANDOM() LIMIT $2;',
                [questionData.subjectId, questionData.limit]
            )

        })

    })

})