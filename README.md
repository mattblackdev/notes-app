# notes-app
Example of a Meteor + React app with unit testing using Mocha, Chai and Sinon. As well as end-to-end testing with Chimp.

### Installation
1. [Install meteor](https://www.meteor.com/install)
2. Clone the repo ```git clone https://github.com/mattblackdev/notes-app.git```
3. ```meteor npm install```

### Unit/Integration Testing

1. ```npm test``` or ```meteor test --debug-port 5858 --driver-package=practicalmeteor:mocha```
2. Open ```http://localhost:3000/``` for Mocha web reporter.

#### Debugging Unit/Integration Tests

Debug client side tests via browser dev tools on ```http://localhost:3000/```. 
To debug server side test code open a new tab/window and go to ```http://localhost:8080/?port=5959``` 
Use a ```debugger``` statement in the test code. Once the app refreshes it should hit.

### Acceptance (End-to-End) Testing with Chimp

1. Make sure you have the [recommended JDK installed for Chimp](https://chimp.readme.io/docs/installation)
2. Start the meteor app in full-app test mode: ```meteor npm run test-chimp``` or ```meteor test --full-app --driver-package tmeasday:acceptance-test-driver```
3. In another shell start chimp with ```meteor npm run chimp``` or ```chimp --ddp=http://localhost:3000 --watch --path=tests --chai --jsonOutput=cucumber_output.json```

Chimp defaults to opening a Chrome browser. Either make sure you have Chrome or see the [docs](https://chimp.readme.io/docs/getting-started-with-meteor-cucumber) for more information about the ```--browser``` flag options.

#### Debugging Chimp
Setting up debugging for Chimp test is a little more involved. [See the docs](https://chimp.readme.io/docs/debugging) for the best explanation.
