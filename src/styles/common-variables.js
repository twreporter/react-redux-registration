export const font = {
  size: {
    small: '12px',
    base: '14px',
    medium: '16px',
    large: '18px',
    h2: '20px',
  },
  color: {
    title: '#4a4949',
  },
}

/**
* @prop {obj} SignInForm.buttons.propertyItems - 1. drark color 2. light color these two for linear-gradient
* @prop {obj} SignInForm.buttons.dimension - size for the whole signinform
*/

// WIDGETHEIGHT control heights of inputs and buttons
const WIDGETHEIGHT = '55px'
const TITLEFONTSIZE = '34px'
const BUTTONDARK = '#1f1f1f'
const BUTTONLIGHT = '#333333'
const FONTCOLOR = '#fff'
export const FORM_WIDTH = '275px'

export const SignInForm = {
  title: {
    fontSize: TITLEFONTSIZE,
  },
  inputs: {
    height: WIDGETHEIGHT,
  },
  buttons: {
    fontColor: FONTCOLOR,
    height: WIDGETHEIGHT,
    signin: { light: BUTTONLIGHT, dark: BUTTONDARK },
  },
  dimension: {
    width: FORM_WIDTH,
  },
}

export const SignUpForm = {
  title: {
    fontSize: TITLEFONTSIZE,
  },
  inputs: {
    height: WIDGETHEIGHT,
  },
  buttons: {
    fontColor: FONTCOLOR,
    height: WIDGETHEIGHT,
    color: { light: BUTTONLIGHT, dark: BUTTONDARK },
  },
  dimension: {
    width: FORM_WIDTH,
  },
}
