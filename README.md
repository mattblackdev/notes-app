# notes-app
Example of a Meteor + React app with unit testing using Mocha, Chai and Sinon. As well as end-to-end testing with Chimp.

### Unit/Integration Testing

1. ```npm test``` or ```meteor test --debug-port 5858 --driver-package=practicalmeteor:mocha```
2. Open ```http://localhost:3000/``` for Mocha web reporter.

#### Debugging Unit/Integration Tests

Debug client side tests via browser dev tools on ```http://localhost:3000/```. 
To debug server side test code open a new tab/window and go to ```http://localhost:8080/?port=5959``` 
Use a ```debugger``` statement in the test code. Once the app refreshes it should hit.

### Acceptance (End-to-End) Testing with Chimp

1. Make sure you have the [recommended JDK installed for Chimp](https://chimp.readme.io/docs/installation)
2. ```meteor npm run chimp```
