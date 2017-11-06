import { connect } from 'react-redux'
import { FACEBOOK_LOGIN } from '../constants/string'
import { OAuthButoon, IconContainer } from '../components/form-widgets'
import FacebookIcon from '../static/facebook_button_logo.svg'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'

const _ = {
  get,
}

const FacebookButton = OAuthButoon.extend`
  position: relative;
  background-color: #39579a;
  &:link, :active, :visited, :focus {
    color: white !important;
    text-decoration: none;
  }
`

const Facebook = (props) => {
  const { apiUrl, facebookPath, location, domain } = props
  return (
    <FacebookButton
      href={`${apiUrl}${facebookPath}?location=${location}&domain=${domain}`}
    >
      <IconContainer>
        <FacebookIcon />
      </IconContainer>
      <span>{`${FACEBOOK_LOGIN}`}</span>
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
