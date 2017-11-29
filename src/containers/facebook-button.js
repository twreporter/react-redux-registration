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
  const { apiUrl, facebookPath, host, activatePagePath } = props
  return (
    <FacebookButton
      href={`${apiUrl}${facebookPath}?destination=${host}/${activatePagePath}`}
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
  host: '',
  activatePagePath: '',
}

Facebook.propTypes = {
  apiUrl: PropTypes.string,
  facebookPath: PropTypes.string,
  host: PropTypes.string,
  activatePagePath: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    apiUrl: _.get(state, 'authConfigure.apiUrl', ''),
    facebookPath: _.get(state, 'authConfigure.oAuthProviders.facebook', ''),
    host: _.get(state, 'authConfigure.host', ''),
  }
}

export default connect(mapStateToProps)(Facebook)
