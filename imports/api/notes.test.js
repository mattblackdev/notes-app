import { Meteor } from 'meteor/meteor'
import { expect } from 'meteor/practicalmeteor:chai'

import { Notes } from './notes'

if (Meteor.isServer) {
  describe('notes', function () {
    const userId = 'testUserId1'
    const userId2 = 'testUserId1'

    const noteOne = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'My body for note',
      updatedAt: 0,
      userId
    }
    const noteTwo = {
      _id: 'testNoteId2',
      title: 'My Title',
      body: 'My body for note',
      updatedAt: 0,
      userId: userId2
    }

    beforeEach(function () {
      Notes.remove({})
      Notes.insert(noteOne)
    })

    describe('insert', function () {
      it('should insert new note', function() {
        // Call a meteor method, specifying the 'this' context via 'apply'
        const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId })
        const note = Notes.findOne({ _id, userId })
        expect(note).to.exist
      })

      it('should not insert note if not authenticated', function () {
        expect(() => {
          Meteor.server.method_handlers['notes.insert']()
        }).to.throw()
      })
    })

    describe('remove', function () {
      it('should remove note', function () {
        // Call meteor method, specifying the arguments in an array via apply's second argument
        Meteor.server.method_handlers['notes.remove'].apply({ userId }, [noteOne._id])

        expect(Notes.findOne({ _id: noteOne._id })).to.not.exist
      })

      it('should not remove note if not authenticated', function () {
        expect(() => {
          Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]) // no 'this' context
        }).to.throw()
      })

      it('should not remove note if not valid id', function () {
        expect(() => {
          Meteor.server.method_handlers['notes.remove'].apply({ userId }, []) // no id
        }).to.throw()
      })
    })

    describe('update', function () {
      const title = 'This an updated title'

      it('should update note', function () {

        Meteor.server.method_handlers['notes.update'].apply({ userId }, [ // passing arguments to meteor method
          noteOne._id,
          { title }
        ])

        const note = Notes.findOne({ _id: noteOne._id })
        expect(note.updatedAt).to.be.greaterThan(0)
        expect(note).to.include({ title, body: noteOne.body })
      })

      it('should throw error if extra update properties', function () {
        expect(() => {
          Meteor.server.method_handlers['notes.update'].apply({ userId }, [
            noteOne._id,
            { title, badProperty: 'badValue' }
          ])
        }).to.throw()
      })

      it('should not update note if user was not creator', function () {

        Meteor.server.method_handlers['notes.update'].apply({
          userId: 'someOtherUserId'
        }, [ // passing arguments to meteor method
          noteOne._id,
          { title }
        ])

        const note = Notes.findOne({ _id: noteOne._id })
        expect(note.title).to.equal(noteOne.title)
      })

      it('should not update note if user not authenticated', function () {
        expect(() => {
          Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id, { }]) // no 'this' context
        }).to.throw()
      })

      it('should not update note if not valid id', function () {
        expect(() => {
          Meteor.server.method_handlers['notes.update'].apply({ userId }, [
            '', { title }
          ]) // no id
        }).to.throw()
      })
    })

    describe('subscribe', function () {
      it('should return a users notes', function () {
        const notes = Meteor.server.publish_handlers.notes.apply({ userId }).fetch() // call meteor publication
        expect(notes.length).to.equal(1)
        expect(notes[0]).to.deep.equal(noteOne)
      })

      it('should return zero notes for user that has none', function () {
        const notes = Meteor.server.publish_handlers.notes.apply({ userId: 'someNonExistentUserId' }).fetch()
        expect(notes.length).to.equal(0)
      })
    })
  })
}