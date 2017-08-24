import { Meteor } from 'meteor/meteor'
import React from 'react'
import chai, { expect, should } from 'chai'
import sinon from 'sinon' // spies/mocking
import sinonChai from 'sinon-chai' // nice bindings
import { shallow } from 'enzyme' // handles react components
import chaiEnzyme from 'chai-enzyme' // nice bindings
chai.should()
chai.use(sinonChai)
chai.use(chaiEnzyme)

import { Signup } from './Signup'
import {mountWithRouter} from '../testUtils'

if (Meteor.isClient) {
  describe('<Signup />', function () {
    it('should show error messages', function () {
      const error = 'This is not working'
      const wrapper = shallow( <Signup createUser={() => {}}/> )

      wrapper.setState({ error }) // enzyme can set state on react components
      const p = wrapper.find('p') // get the 'p' tag text with enzyme
      p.text().should.equal(error)

      wrapper.setState({ error: '' }) // change state, clear error text
      // use find() again because previously returned obj 'p' does not update
      wrapper.find('p').length.should.equal(0)
    })

    it('should call createUser with the form data', function () {
      const email = 'matt@test.com'
      const password = 'password123'
      const spy = sinon.spy()
      const wrapper = mountWithRouter( <Signup createUser={spy}/> )

      wrapper.instance().email.value = email
      wrapper.instance().password.value = password
      wrapper.find('form').simulate('submit')

      spy.should.have.been.calledWith({ email , password }) // uses sinon-chai's extensions to chai's 'expect'
    })

    it('should set error if short password', function () {
      const email = 'matt@test.com'
      const password = 'pass          '
      const createUserSpy = sinon.spy()
      const wrapper = mountWithRouter( <Signup createUser={createUserSpy}/> )

      wrapper.instance().email.value = email
      wrapper.instance().password.value = password
      wrapper.find('form').simulate('submit')

      createUserSpy.should.not.have.been.called
      wrapper.state('error').length.should.be.greaterThan(0)
    })

    it('should set createUser callback errors', function () {
      const password = 'password123!'
      const reason = 'This is why it failed'
      const createUserSpy = sinon.spy()
      const wrapper = mountWithRouter( <Signup createUser={createUserSpy}/> )

      wrapper.instance().password.value = password
      wrapper.find('form').simulate('submit')

      createUserSpy.getCall(0).args[1]({ reason }) // call the error handler in the Signup component
      wrapper.state('error').should.equal(reason)

      createUserSpy.getCall(0).args[1]() // call again but with no arguments
      wrapper.state('error').should.equal('')
    })
  })
}