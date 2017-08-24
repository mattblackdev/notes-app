import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom'

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: ''
    }
  }

  onSubmit(e) {
    e.preventDefault()

    let email = this.email.value.trim()
    let password = this.password.value.trim()

    this.props.loginWithPassword({email}, password, err => {
      if (err) {
        this.setState({error: 'Unable to login. Check email and password.'})
      } else {
        this.setState({error: ''})
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        {this.state.error
          ? <p>{this.state.error}</p>
          : undefined
        }

        <form onSubmit={e => this.onSubmit(e)} noValidate>
          <input type="email" ref={email => this.email = email} name="email" placeholder="Email"/>
          <input type="password" ref={password => this.password = password} name="password" placeholder="Password"/>
          <button>Login</button>
        </form>

        <Link to="/signup">Need an account?</Link>
      </div>
    )
  }
}

Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired,
}

export default createContainer(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  }
}, Login)