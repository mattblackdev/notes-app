import { Meteor } from 'meteor/meteor'
import React from 'react'
import chai, { expect } from 'chai'
import sinon from 'sinon' // spies/mocking
import sinonChai from 'sinon-chai' // nice bindings
import { mount } from 'enzyme' // handles react components
import chaiEnzyme from 'chai-enzyme' // nice bindings
chai.use(sinonChai)
chai.use(chaiEnzyme)

import { PrivateHeader } from './PrivateHeader'

if (Meteor.isClient) {
  describe('<PrivateHeader />', function () {
    it('should set button text to logout', function () {
      const wrapper = mount( <PrivateHeader title="Test title"/> ) // mount the react component
      const buttonText = wrapper.find('button').text() // Enzyme is like jquery

      expect(buttonText).to.equal('Logout')
    })

    it('should use title prop as h1 text', function () {
      const title = 'Test title'
      const wrapper = mount( <PrivateHeader title={title} />)
      const renderedTitle = wrapper.find('h1').text()

      expect(renderedTitle).to.be.equal(title)
    })

    it('should call handleLogout on click', function () {
      const spy = sinon.spy()
      const wrapper = mount( <PrivateHeader title="Title" handleLogout={spy}/> )

      wrapper.find('button').simulate('click')

      expect(spy).to.have.been.called
    })
  })
}
