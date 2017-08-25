import { Meteor } from 'meteor/meteor'
import React from 'react'
import chai, { expect } from 'chai'
import sinon from 'sinon' // spies/mocking
import sinonChai from 'sinon-chai' // nice bindings
import { shallow } from 'enzyme' // handles react components
import chaiEnzyme from 'chai-enzyme' // nice bindings
chai.use(sinonChai)
chai.use(chaiEnzyme)

import { Login } from './Login'
import mountWithRouter from '../utils/mountWithRouter' // mountWithRouter injects a stub of react router context

if (Meteor.isClient) {
  describe('<Login />', function () {
    it('should show error messages', function () {
      const error = 'This is not working'
      const wrapper = shallow( <Login loginWithPassword={() => {}}/> )

      wrapper.setState({ error }) // enzyme can set state on react components
      const p = wrapper.find('p') // get the 'p' tag text with enzyme
      expect(p.text()).to.equal(error)

      wrapper.setState({ error: '' }) // change state, clear error text
      // use find() again because previously returned obj 'p' does not update
      expect(wrapper.find('p').length).to.equal(0)
    })

    it('should call loginWithPassword with the form data', function () {
      const email = 'matt@test.com'
      const password = 'password123'
      const spy = sinon.spy()

      // use mountWithRouter because <Login /> contains a <Link /> component
      // which requires the react router context
      const wrapper = mountWithRouter( <Login loginWithPassword={spy}/> )

      wrapper.instance().email.value = email
      wrapper.instance().password.value = password
      wrapper.find('form').simulate('submit')

      expect(spy).to.have.been.calledWith({ email }, password) // uses sinon-chai's extensions to chai's 'expect'
    })

    it('should set errors when loginWithPassword callback called', function () {
      const spy = sinon.spy()
      const wrapper = mountWithRouter( <Login loginWithPassword={spy}/> )

      wrapper.find('form').simulate('submit')

      spy.getCall(0).args[2]({}) // call the error handler in the Login component
      expect(wrapper.state('error').length).to.be.greaterThan(0)

      spy.getCall(0).args[2]() // call again but with no arguments
      expect(wrapper.state('error')).to.equal('')
    })
  })
}