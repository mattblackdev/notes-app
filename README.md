# notes-app
Example of Meteor + React unit testing with Mocha, Chai, Sinon &amp; Chimp.

## Unit Testing

1. ```npm test``` or ```meteor test --debug-port 5858 --driver-package=practicalmeteor:mocha```
2. Open ```http://localhost:3000/``` for Mocha web reporter.
3. To debug client side tests open the dev tools to pause on a ```debugger``` statement.
4. To debug server-side
  a. Add the approriate ```debugger``` statement in the server side test code
  b. Open: ```http://localhost:8080/?port=5959```

## End-to-End Testing with Chimp

