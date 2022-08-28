const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')

const initialNotes = [
  { content: 'HTML is easy', date: new Date(), important: false },
  { content: 'Browser can execute only Javascript', date: new Date(), important: true }
]

beforeEach(async () => {
  await Note.deleteMany({})
  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two notes', async () => {
  // IntelliJ thinks that the 'await' in the following line is not necessary, but it certainly is!!
  // noinspection ES6RedundantAwait
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  // noinspection ES6RedundantAwait
  const response = await api.get('/api/notes')
  const contents = response.body.map(r => r.content)
  expect(contents).toContain('Browser can execute only Javascript')
})

// NOTE:
// the mongoose.connect(MONGODB_URL) happens when calling: const app = require('../app')
afterAll(() => {
  mongoose.connection.close()
})
