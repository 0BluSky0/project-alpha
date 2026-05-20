const Question = require('../models/question')
const Option = require('../models/option')
const GameSession = require('../models/gameSession')
const User = require('../models/User')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

const mockStatus = jest.fn(() => ({ 
  send: mockSend, 
  json: mockJson, 
  end: mockEnd 
}))

const mockRes = { status: mockStatus }