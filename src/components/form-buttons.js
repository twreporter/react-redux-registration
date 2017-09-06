// parameters height, width, bg
import styled from 'styled-components'
import { SignInForm } from '../styles/common-variables'

export const OAuthButoon = styled.a`
  display: block;
  border-style: none;
  border-radius: 3px;
  background: linear-gradient(-180deg, gray  0%, black 90%);
  height: ${SignInForm.buttons.height};
  width:100%;
  margin-bottom: 17px;
  text-decoration: none;
  color: ${SignInForm.buttons.fontColor};
  text-align: center;
  line-height: ${SignInForm.buttons.height};
`

export const NormalButton = styled.button`
  border-style: none;
  width:100%;
  border-radius: 3px;
  background: linear-gradient(-180deg, ${SignInForm.buttons.signin.light}  0%, ${SignInForm.buttons.signin.dark} 90%);
  height: ${SignInForm.buttons.height};
  margin-bottom: 17px;
  &:hover {
    cursor: pointer
  }
  color: ${SignInForm.buttons.fontColor};
  outline: none;
`
