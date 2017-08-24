import React from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

import { Notes } from '../../api/notes'
import NoteListHeader from './NoteListHeader'
import NoteListItem from './NoteListItem'

export const NoteList = props => (
  <div>
    <NoteListHeader/>
    <div>
      {props.notes.map((note, idx) => (
        <NoteListItem key={idx} note={note}/>
      ))}
    </div>
    NoteList {props.notes.length}
  </div>
)

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default createContainer(props => {
  Meteor.subscribe('notes')

  return {
    notes: Notes.find().fetch()
  }
}, NoteList)