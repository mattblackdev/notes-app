import React from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'

export const NoteListHeader = props => (
  <div>
    <button onClick={() => props.meteorCall('notes.insert')}>Create Note</button>
  </div>
)

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
}

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  }
}, NoteListHeader)