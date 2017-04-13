import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import { OAuthButoon } from '../components/form-buttons'
import { connect } from 'react-redux'
import { SignInForm } from '../styles/common-variables'
import { FACEBOOK_LOGIN } from '../constants/SignIn'

const _ = {
  get,
}

const FacebookButton = OAuthButoon.extend`
  background: linear-gradient(-180deg, ${SignInForm.buttons.facebook.light}  0%, ${SignInForm.buttons.facebook.dark} 90%);
`

const Facebook = (props) => {
  const { apiUrl, facebookPath, location, domain } = props
  return (
    <FacebookButton
      href={`${apiUrl}${facebookPath}?location=${location}&domain=${domain}`}
    >
      {`${FACEBOOK_LOGIN}`}
    </FacebookButton>
  )
}


Facebook.defaultProps = {
  apiUrl: '',
  facebookPath: '',
  location: '',
  domain: '',
}

Facebook.propTypes = {
  apiUrl: PropTypes.string,
  facebookPath: PropTypes.string,
  location: PropTypes.string,
  domain: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    apiUrl: _.get(state, 'authConfigure.apiUrl', ''),
    facebookPath: _.get(state, 'authConfigure.oAuthProviders.facebook', ''),
    location: _.get(state, 'authConfigure.location', ''),
    domain: _.get(state, 'authConfigure.domain', ''),
  }
}

export default connect(mapStateToProps)(Facebook)
