import { Meteor } from 'meteor/meteor'
import { expect } from 'meteor/practicalmeteor:chai'

import { validateNewUser } from './users'

if (Meteor.isServer) {
  describe('users', function () {
    describe('validateNewUser', function () {


      it('should allow valid email address', function () {
        const testUser = {
          emails: [{
            address: 'test@example.com'
          }]
        }
        const res = validateNewUser(testUser)
        expect(res).to.equal(true)
      })

      it('should reject invalid email', function () {
        const testUser = {
          emails: [{
            address: undefined
          }]
        }

        expect(() => {
          validateNewUser(testUser)
        }).to.throw()
      })
    })
  })
}



// const add = (a, b) => {
//   if (typeof b !== 'number') {
//     return a + a
//   }
//
//   return a + b
// }
//
// const square = a => a * a
//
// describe('Add', function() {
//   it('should add two numbers', function () {
//     const result = add(3, 7)
//     expect(result, `add(3, 7)`).to.equal(10)
//
//   })
//
//   it('should double a single number', function () {
//     const res = add(11)
//     expect(res).to.equal(22)
//   })
// })
//
// describe('Square', function () {
//   it('should square a number', function () {
//     const res = square(5)
//
//     expect(res).to.equal(25)
//   })
// })
