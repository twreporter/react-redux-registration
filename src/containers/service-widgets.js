import { appConfig } from '../config'
import { connect } from 'react-redux'
import { signOutUser } from '../actions/authentication'
import get from 'lodash/get'
import Link from 'react-router/lib/Link'
import PropTypes from 'prop-types'
import React from 'react'
import SignInIcon from '../static/member-icon.svg'
import SignOutIcon from '../static/signout.svg'
import styled from 'styled-components'

const _ = {
  get,
}

const Container = styled.div`
  ${(props) => {
    if (props.svgColor !== '') {
      return `
        path {
          fill: ${props.svgColor};
        }

        circle {
          fill: ${props.svgColor};
        }
      `
    }
    return ''
  }};
`

const IconContainer = styled.div`
  width: 20px;
  height: 18px;
`

class ServiceWidgets extends React.Component {
  render() {
    const { ifAuthenticated, signOutAction, svgColor } = this.props
    const linkTo = ifAuthenticated ? `${appConfig.host}` : `${appConfig.host}/signin`
    const Member = (
      <Link
        to={linkTo}
        target="_blank"
        onClick={() => {
          signOutAction()
        }}
      >
        {ifAuthenticated ? <SignOutIcon /> : <SignInIcon />}
      </Link>
    )
    return (
      <Container svgColor={svgColor}>
        <IconContainer>
          {Member}
        </IconContainer>
      </Container>
    )
  }
}

ServiceWidgets.defaultProps = {
  ifAuthenticated: false,
  signOutAction: () => {},
  svgColor: '',
}

ServiceWidgets.propTypes = {
  ifAuthenticated: PropTypes.bool,
  signOutAction: PropTypes.func,
  svgColor: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    ifAuthenticated: _.get(state, 'auth.authenticated', ''),
  }
}

export default connect(mapStateToProps, { signOutAction: signOutUser })(ServiceWidgets)
