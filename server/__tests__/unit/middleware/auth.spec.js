const jwt = require('jsonwebtoken');
const auth = require('../../../middleware/auth');

const mockNext = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(() => ({ json: mockJson }));
const mockRes = { status: mockStatus };

describe('auth middleware', () => {

    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());

    it('should call next() and set req.user if token is valid', () => {

        //Arrange
        const mockReq = { headers: { authorization: 'Bearer valid-token' } };
        const mockDecoded = { id: 1, role: 'student' };
        jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
            callback(null, mockDecoded);
        });

        //Act
        auth(mockReq, mockRes, mockNext);

        //Assert
        expect(jwt.verify).toHaveBeenCalledTimes(1);
        expect(mockReq.user).toEqual(mockDecoded);
        expect(mockNext).toHaveBeenCalledTimes(1);

    });

    it('should return 403 if token is invalid', () => {

        //Arrange
        const mockReq = { headers: { authorization: 'Bearer invalid-token' } };
        jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
            callback(new Error('Invalid token'), null);
        });

        //Act
        auth(mockReq, mockRes, mockNext);

        //Assert
        expect(mockStatus).toHaveBeenCalledWith(403);
        expect(mockJson).toHaveBeenCalledWith({ error: 'Invalid token' });
        expect(mockNext).not.toHaveBeenCalled();

    });

    it('should return 403 if no token is provided', () => {

        //Arrange
        const mockReq = { headers: {} };

        //Act
        auth(mockReq, mockRes, mockNext);

        //Assert
        expect(mockStatus).toHaveBeenCalledWith(403);
        expect(mockJson).toHaveBeenCalledWith({ error: 'Missing token' });
        expect(mockNext).not.toHaveBeenCalled();

    });

});