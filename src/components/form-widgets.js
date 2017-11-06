// parameters height, width, bg
/* eslint-disable */
import styled from 'styled-components'
import { SignInForm } from '../styles/common-variables'
import React from 'react'
import PropTypes from 'prop-types'

const WIDGETHEIGHT = '55px'

export const Title = styled.p`
  width: 100%;
  text-align: center;
  font-size: 34px;
  color: #4a4949;
  font-weight: bold;
`

export const OAuthButoon = styled.a`
  display: block;
  border-style: none;
  border-radius: 3px;
  height: ${SignInForm.buttons.height};
  width:100%;
  margin-bottom: 15px;
  text-decoration: none;
  text-align: center;
  line-height: ${SignInForm.buttons.height};
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.6px;
  vertical-align: middle;
`

export const NormalButtonStyle = (() => {
  return `
    border-style: none;
    width: 137.5px;
    border-radius: 3px;
    background-color: #a67a44;
    height: ${SignInForm.buttons.height};
    margin-bottom: 17px;
    &:hover {
      cursor: pointer
    }
    color: ${SignInForm.buttons.fontColor};
    outline: none;
  `
})()

export const NormalButton = styled.button`
  ${NormalButtonStyle}
`

export const IconContainer = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  height: 18px;
  width: 18px;
  svg {
    position: absolute;
    height: 18px;
    width: 18px;
  }
`

const CheckBoxContainer = styled.div`
  font-size: ${props => `${props.fontSize}px`};
  color: ${props => props.fontColor};
  display: inline-block;
  input[type=checkbox]:not(old){
    width     : 2em;
    margin    : 0;
    padding   : 0;
    font-size : 1em;
    opacity   : 0;
  }

  input[type=checkbox]:not(old) + label{
    display      : inline-block;
    margin-left  : -2em;
    line-height  : 1.5em;
  }

  input[type=checkbox]:not(old) + label > span{
    display          : inline-block;
    width            : 0.875em;
    height           : 0.875em;
    margin           : 0.25em 0.5em 0.25em 0.25em;
    border           : 0.0625em solid ${props => props.utilColor};
    vertical-align   : bottom;
  }

  input[type=checkbox]:not(old):checked + label > span:before{
    content     : '\\2713';
    display     : block;
    width       : 1em;
    color       : ${props => props.utilColor};
    font-size   : 0.875em;
    line-height : 1em;
    text-align  : center;
  }

  label {
    font-weight: unset;
    margin: 0;
  }
`

export const InputContainer = styled.div`
  margin-bottom: 15px;
`

export const Input = styled.input`
  width:100%;
  height: ${WIDGETHEIGHT};
  box-sizing : border-box;
  border: 1px solid #d8dee2;
  border-radius: 3px;
  padding-left: 15px;
  font-size: 13px;
  font-weight: bold;
  color: #4a4949;
  background-color: #e8e8e8;
  &:focus {
    outline: none;
    border:1px solid #a67a44;
 }
`

class CheckBox extends React.Component {
  constructor(props) {
    super(props)
    this.onToggle = this._onToggle.bind(this)
  }

  _onToggle(e) {
    const target = e.target;
    const value = target.checked
    this.props.onToggle(value)
  }

  render () {
    const {text, utilColor, fontSize, fontColor, checked} = this.props
    return (
      <CheckBoxContainer
        utilColor={utilColor}
        fontSize={fontSize}
        fontColor={fontColor}
      >
        <input
          id="option"
          type="checkbox"
          name="field"
          value="option"
          onChange={this.onToggle}
          checked={checked}
        />
      <label htmlFor="option">
        <span><span></span></span>{text}
       </label>
      </CheckBoxContainer>
    )
  }
}

CheckBox.propTypes = {
  text: PropTypes.string.isRequired,
  utilColor: PropTypes.string,
  fontSize: PropTypes.number,
  fontColor: PropTypes.string,
}

CheckBox.defaultProps = {
  utilColor: '#a67a44',
  fontSize: 13,
  fontColor: '#4a4949',
}

export { CheckBox }
