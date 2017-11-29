import { connect } from 'react-redux'
import { GOOGLE_LOGIN } from '../constants/string'
import { OAuthButoon, IconContainer } from '../components/form-widgets'
import { colors } from '../styles/common-variables'
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
    color: ${colors.textBlack} !important;
    text-decoration: none;
  }
  margin-bottom: 0;
`

const Google = (props) => {
  const { apiUrl, googlePath, host, activatePagePath } = props
  return (
    <GoogleButton
      href={`${apiUrl}${googlePath}?destination=${host}/${activatePagePath}`}
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
  host: '',
  destinationPath: '',
  activatePagePath: '',
}

Google.propTypes = {
  apiUrl: PropTypes.string,
  googlePath: PropTypes.string,
  host: PropTypes.string,
  activatePagePath: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    apiUrl: _.get(state, 'authConfigure.apiUrl', ''),
    googlePath: _.get(state, 'authConfigure.oAuthProviders.google', ''),
    host: _.get(state, 'authConfigure.host', ''),
  }
}

export default connect(mapStateToProps)(Google)
