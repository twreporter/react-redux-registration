export const font = {
  size: {
    small: '12px',
    base: '14px',
    medium: '16px',
    large: '18px',
    h2: '20px',
  },
  color: '#333',
}

/**
* @prop {obj} SignInForm.buttons.propertyItems - 1. drark color 2. light color these two for linear-gradient
* @prop {obj} SignInForm.buttons.dimension - size for the whole signinform
*/

// WIDGETHEIGHT control heights of inputs and buttons
const WIDGETHEIGHT = '32px'
const TITLEFONTSIZE = '27px'
const BUTTONDARK = '#1f1f1f'
const BUTTONLIGHT = '#333333'
const FONTCOLOR = '#fff'

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
    facebook: { light: '#476bb8', dark: '#3B5998' },
    google: { light: '#df4d3a', dark: '#DE4734' },
    signin: { light: BUTTONLIGHT, dark: BUTTONDARK },
  },
  dimension: {
    width: '308px',
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
    width: '308px',
  },
}
