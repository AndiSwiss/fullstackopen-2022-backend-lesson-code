const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
  await helper.initializeUserDb()
  await helper.initializeNoteDb()
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
    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(r => r.content)
    expect(contents).toContain('Browser can execute only Javascript')
  })
})

describe('fetch individual note', () => {
  test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToView = notesAtStart[0]
    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    // The following only has the effect that it converts the 'date' entry from an actual Date-Object to a Date-String
    const processedNoteToView = JSON.parse(JSON.stringify(noteToView))
    expect(resultNote.body).toEqual(processedNoteToView)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    await api
      .get(`/api/notes/${invalidId}`)
      .expect(400)
  })
})

describe('adding a new note', () => {
  test('a valid note (with a valid userId) can be added', async () => {
    const firstUser = (await helper.usersInDb())[0]
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
      userId: firstUser.id
    }
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
    const contents = notesAtEnd.map(n => n.content)
    expect(contents).toContain('async/await simplifies making async calls')
    // Also check, if the note was added to the user
    const updatedUser = (await helper.usersInDb())[0]
    expect(updatedUser.notes).toHaveLength(firstUser.notes.length + 1)
  })

  test('a note without a valid userId fails', async () => {
    const newNote = { content: 'async/await simplifies making async calls', important: true }
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  })

  test('note without content is not added and fails with status code 400', async () => {
    const newNote = { important: true }
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  })

  test('note a too short title is not added and fails with status code 400', async () => {
    const newNote = { content: 'tiny', important: true }
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  })
})

describe('change and delete individual note', () => {
  test('note title can be changed', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToChange = { ...notesAtStart[0], content: 'Changed title is nice' }
    const updatedNote = await api
      .put(`/api/notes/${noteToChange.id}`)
      .send({ content: 'Changed title is nice' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const processedNoteToChange = JSON.parse(JSON.stringify(noteToChange))
    expect(updatedNote.body).toEqual(processedNoteToChange)
  })

  test('note title too short', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteIdToChange = notesAtStart[0].id
    await api
      .put(`/api/notes/${noteIdToChange}`)
      .send({ content: 'Tiny' })
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]
    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)
    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
    const contents = notesAtEnd.map(r => r.content)
    expect(contents).not.toContain(noteToDelete.content)
  })
})

// NOTE:
// the mongoose.connect(MONGODB_URL) happens when calling: const app = require('../app')
afterAll(() => {
  mongoose.connection.close()
})
