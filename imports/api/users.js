import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

export const validateNewUser = user => {
  const email = user.emails[0].address
  if(!email || email.length < 1) {
    throw new Meteor.Error('No email address')
  }
  return true
}

if (Meteor.isServer) {
  Accounts.validateNewUser(validateNewUser)
}
