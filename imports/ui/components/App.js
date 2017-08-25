import React from 'react'
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
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
      <Route exact path="/" render={() => (
        props.user ? (
          <div>
            <PrivateHeader title="Dashboard"/>
            <NoteList/>
          </div>
        ) : (
          <Redirect to="/login" />
        )
      )}/>
      <Route path="/login" render={() => props.user
        ? <Redirect to="/" />
        : <Login />
      }/>
      <Route path="/signup" render={() => props.user
        ? <Redirect to="/" />
        : <Signup />
      }/>
    </Switch>
  </Router>
)

export default createContainer(() => {
  return {
    user: Meteor.user()
  }
}, App)