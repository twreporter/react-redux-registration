import { connect } from 'react-redux'
import { GOOGLE_LOGIN } from '../constants/string'
import { OAuthButoon, IconContainer } from '../components/form-widgets'
import get from 'lodash/get'
import GoogleIcon from '../static/google_button_logo.svg'
import PropTypes from 'prop-types'
import React from 'react'

const _ = {
  get,
}

const GoogleButton = OAuthButoon.extend`
  position: relative;
  background-color: white;
  &:link, :active, :visited, :focus {
    color: #4a4949 !important;
    text-decoration: none;
  }
  margin-bottom: 0;
`

const Google = (props) => {
  const { apiUrl, googlePath, location, domain } = props
  return (
    <GoogleButton
      href={`${apiUrl}${googlePath}?location=${location}&domain=${domain}`}
    >
      <IconContainer>
        <GoogleIcon />
      </IconContainer>
      <span>{`${GOOGLE_LOGIN}`}</span>
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
