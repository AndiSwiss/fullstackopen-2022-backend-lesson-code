const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)


// NOTE:
// the mongoose.connect(MONGODB_URL) happens when calling: const app = require('../app')
afterAll(() => {
  mongoose.connection.close()
})
