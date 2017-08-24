import { Meteor } from 'meteor/meteor'
import React from 'react'
import moment from 'moment'
import chai, { expect, should } from 'chai'
import sinon from 'sinon' // spies/mocking
import sinonChai from 'sinon-chai' // nice bindings
import { mount } from 'enzyme' // handles react components
import chaiEnzyme from 'chai-enzyme' // nice bindings
chai.should()
chai.use(sinonChai)
chai.use(chaiEnzyme)

import { NoteListHeader } from './NoteListHeader'

if (Meteor.isClient) {
  describe('<NoteListHeader />', function () {
    it('should call meteorCall on click', function () {
      const meteorCallSpy = sinon.spy()
      const wrapper = mount( <NoteListHeader meteorCall={meteorCallSpy}/> )

      wrapper.find('button').simulate('click')
      meteorCallSpy.should.have.been.calledWith('notes.insert')
    })
  })
}
