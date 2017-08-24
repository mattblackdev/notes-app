import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Accounts } from 'meteor/accounts-base'
import { createContainer } from 'meteor/react-meteor-data'

import Button from './Button'


const Wrapper = styled.div`
  border-bottom: 2px solid #282a36
`

const Header = styled.div`
  color: #6272a4;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10vw;
  max-width: 800px;
  margin: 0 auto;
`

export const PrivateHeader = props => (
  <Wrapper>
    <Header>
      <h1>{props.title}</h1>
      <Button onClick={props.handleLogout}>Logout</Button>
    </Header>
  </Wrapper>
)

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func
}

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout()
  }
}, PrivateHeader)