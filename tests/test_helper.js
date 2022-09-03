const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  { content: 'HTML is easy', date: new Date(), important: false },
  { content: 'Browser can execute only Javascript', date: new Date(), important: true }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon', date: new Date() })
  await note.save()
  await note.remove()
  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  /* NOTE:
   * The following changes:
   *    _id: new ObjectId("630b8efa126f08d6cecc0f79")    ==>     id: '630b8efa126f08d6cecc0f79'
   * And removes the    __v: 0
   *
   * BEFORE:
   * =======
     {
        _id: new ObjectId("630b8efa126f08d6cecc0f79"),
        content: 'HTML is easy',
        date: 2022-08-28T15:51:21.839Z,
        important: false,
        __v: 0
      }
   *
   * AFTER:
   * ======
     {
        content: 'HTML is easy',
        date: 2022-08-28T15:51:21.839Z,
        important: false,
        id: '630b8efa126f08d6cecc0f79'
      }
   */
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = { initialNotes, nonExistingId, notesInDb, usersInDb }
