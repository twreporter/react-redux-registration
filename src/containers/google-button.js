import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import { OAuthButoon } from '../components/form-buttons'
import { connect } from 'react-redux'
import { SignInForm } from '../styles/common-variables'
import { GOOGLE_LOGIN } from '../constants/string'

const _ = {
  get,
}

const GoogleButton = OAuthButoon.extend`
  background: linear-gradient(-180deg, ${SignInForm.buttons.google.light}  0%, ${SignInForm.buttons.google.dark} 90%);
`

const Google = (props) => {
  const { apiUrl, googlePath, location, domain } = props
  return (
    <GoogleButton
      href={`${apiUrl}${googlePath}?location=${location}&domain=${domain}`}
    >
      {`${GOOGLE_LOGIN}`}
    </GoogleButton>
  )
}

Google.defaultProps = {
  apiUrl: '',
  googlePath: '',
  location: '',
  domain: '',
}

Google.propTypes = {
  apiUrl: PropTypes.string,
  googlePath: PropTypes.string,
  location: PropTypes.string,
  domain: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    apiUrl: _.get(state, 'authConfigure.apiUrl', ''),
    googlePath: _.get(state, 'authConfigure.oAuthProviders.google', ''),
    location: _.get(state, 'authConfigure.location', ''),
    domain: _.get(state, 'authConfigure.domain', ''),
  }
}

export default connect(mapStateToProps)(Google)
