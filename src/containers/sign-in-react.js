import React from 'react'
import SignInPrototype from './sign-in-prototype'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router'
import { SIGN_UP } from '../constants/string'

const LinkStyle = styled.span`
  color: #0366D6;
  opacity: 0.7;
  &:hover {
    cursor: pointer;
  }
`

const signUpArea = (() => {
  return (
    <div>
      <span>{`${SIGN_UP.plainText}`}&nbsp;</span>
      <Link to="/signup"><LinkStyle>{`${SIGN_UP.linkText}`}</LinkStyle></Link>
    </div>
  )
})()

const SignInReact = (props) => {
  return (
    <SignInPrototype
      signUpArea={signUpArea}
      {...props}
    />
  )
}


export default withRouter(SignInReact)
