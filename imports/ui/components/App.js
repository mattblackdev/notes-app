import React from 'react'
import {
  Switch,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { createContainer } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'

import PrivateHeader from './PrivateHeader'
import Signup from './Signup'
import Login from './Login'
import NoteList from './NoteList'

const App = props => (
  <Router>
    <Switch>
      <Route path="/" exact>
        {props.user !== undefined
          ? <div>
              <PrivateHeader title="Dashboard"/>
              <NoteList/>
            </div>
          : <Login/>
        }
      </Route>
      <Route path="/signup" exact>
        <Signup/>
      </Route>
    </Switch>
  </Router>
)

export default createContainer(() => {
  return {
    user: Meteor.user()
  }
}, App)