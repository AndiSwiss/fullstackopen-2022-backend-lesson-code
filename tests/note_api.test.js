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

describe('get notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all initial notes are returned', async () => {
    // IntelliJ thinks that the 'await' in the following line is not necessary, but it certainly is!!
    // noinspection ES6RedundantAwait
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(r => r.content)
    expect(contents).toContain('Browser can execute only Javascript')
  })
})

describe('new note', () => {
  test('a valid note can be added', async () => {
    const newNote = { content: 'async/await simplifies making async calls', important: true }
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/notes')
    const contents = response.body.map(r => r.content)
    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain('async/await simplifies making async calls')
  })

  test('note without content is not added', async () => {
    const newNote = { important: true }
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length)
  })
})


// NOTE:
// the mongoose.connect(MONGODB_URL) happens when calling: const app = require('../app')
afterAll(() => {
  mongoose.connection.close()
})
