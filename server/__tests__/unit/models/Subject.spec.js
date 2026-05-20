const Subject = require('../../../models/Subject')
const db = require('../../../database/db')

describe('Subject', () => {

    beforeEach(() => jest.clearAllMocks())
    afterAll(() => jest.resetAllMocks())

    describe('getAll', () => {

        it('should get all subjects from database', async () => {

            //Arrange
            const mockSubjects = [
                {id: 1, name: 'Sub1' },
                {id: 2, name: 'Sub2' },
                {id: 3, name: 'Sub3' },
            ]
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: mockSubjects })

            //Act
            const result = await Subject.getAll()

            //Assert
            expect(result).toHaveLength(3)
            expect(result[0]).toHaveProperty('id')
            expect(result[0].name).toBe('Sub1')
            expect(db.query).toHaveBeenCalledWith('SELECT * FROM subjects;')
            
        })

        it('should throw an error if no subjects available', async () => {

            //Arrange
            jest.spyOn(db, 'query').mockResolvedValueOnce({rows: []})

            //Act & Assert
           await expect(Subject.getAll()).rejects.toThrow('No subjects available.')

        })

    })


    describe('findById', () => {

        it('should find subject by id', async () => {

            const testSubject = { id: 1, name: 'History' };
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [testSubject] });

            // Act
            const result = await Subject.findById(1);

            // Assert
            expect(result).toBeInstanceOf(Subject);
            expect(result).toHaveProperty('id', 1)
            expect(result).toHaveProperty('name', 'History')
            expect(db.query).toHaveBeenCalledWith('SELECT * FROM subjects WHERE id = $1;',[testSubject.id]);    

        })

        it('should throw an Error when subject is not found', async () => {
            // Arrange
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

            // Act & Assert
            await expect(Subject.findById(999)).rejects.toThrow('Unable to locate subject.');
        });

    })

})