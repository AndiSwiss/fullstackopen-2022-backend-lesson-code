const Note = require('../models/note')
const User = require('../models/user')
const bcrypt = require('bcrypt')

/**
 * Note: Technically, these notes are invalid, since no userId is defined
 */
const initialNotes = [
  { content: 'HTML is easy', date: new Date(), important: false },
  { content: 'Browser can execute only Javascript', date: new Date(), important: true }
]

/**
 * Initial users - password hashing still needs to be done
 */
const initialUsers = [
  { username: 'root', name: 'root user', password: 'sekret-93' },
  { username: 'andi', name: 'Andi S', password: 'topSekret7' }
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

const initializeNoteDb = async () => {
  await Note.deleteMany({})
  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
  //Other variant (also works) => https://fullstackopen.com/en/part4/testing_the_backend#optimizing-the-before-each-function
  // const noteObjects = helper.initialNotes.map(note => new Note(note))
  // const promiseArray = noteObjects.map(note => note.save())
  // await Promise.all(promiseArray)
}

const initializeUserDb = async () => {
  await User.deleteMany({})
  for (const user of initialUsers) {
    const passwordHash = await bcrypt.hash(user.password, 10)
    const userObject = new User({ username: user.username, name: user.name, passwordHash })
    await userObject.save()
  }
}

module.exports = {
  initialNotes,
  initialUsers,
  nonExistingId,
  notesInDb,
  usersInDb,
  initializeNoteDb,
  initializeUserDb
}
