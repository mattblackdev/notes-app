import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Accounts } from 'meteor/accounts-base'
import { createContainer } from 'meteor/react-meteor-data'
import { Link } from 'react-router-dom'

export class Signup extends Component {
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

    if (password.length < 9) {
      return this.setState({ error: 'Password must be more than 8 characters long'})
    }

    this.props.createUser({email, password}, err => {
      if (err) {
        this.setState({ error: err.reason })
      } else {
        this.setState({ error: '' })
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Join</h1>
        {this.state.error
          ? <p>{this.state.error}</p>
          : undefined
        }

        <form onSubmit={e => this.onSubmit(e)} noValidate>
          <input type="email" ref={email => this.email = email} name="email" placeholder="Email"/>
          <input type="password" ref={password => this.password = password} name="password" placeholder="Password"/>
          <button>Create Account</button>
        </form>

        <Link to="/">Already have an account?</Link>
      </div>
    )
  }
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired
}

export default createContainer(() => ({
  createUser: Accounts.createUser
}), Signup)
