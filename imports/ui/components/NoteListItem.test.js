import { Meteor } from 'meteor/meteor'
import React from 'react'
import moment from 'moment'
import chai, { expect, should } from 'chai'
import sinonChai from 'sinon-chai'
import { mount } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
chai.should()
chai.use(sinonChai)
chai.use(chaiEnzyme)

import NoteListItem from './NoteListItem'

if (Meteor.isClient) {
  describe('<NoteListItem />', function () {
    it('should render title and timestamp', function () {
      const title = 'Note title here'
      const updatedAt = 1503597714631
      const wrapper = mount( <NoteListItem note={{title, updatedAt}}/> )

      wrapper.find('h5').text().should.equal(title)
      wrapper.find('p').text().should.equal('8/24/17')
    })

    it('should set default title if no title set', function () {
      const wrapper = mount( <NoteListItem note={{title: '', updatedAt: moment() }}/> )

      wrapper.find('h5').text().length.should.be.greaterThan(0)
    })
  })
}
