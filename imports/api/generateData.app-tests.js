import { Meteor } from 'meteor/meteor'
import { resetDatabase } from 'meteor/xolvio:cleaner'

import { denodeify } from '../utils/denodeify'

Meteor.methods({
  resetDatabase() {
    console.log('$$$$ Resetting database $$$$')
    resetDatabase()
  },
})

if (Meteor.isClient) {
  // Create a second connection to the server to use to call test data methods
  // We do this so there's no contention w/ the currently tested user's connection
  const testConnection = Meteor.connect(Meteor.absoluteUrl());

  const generateData = denodeify(cb => {
    testConnection.call('generateFixtures', cb)
  })

  export { generateData };
}