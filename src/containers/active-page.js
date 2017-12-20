import { activateUser, renewToken } from '../actions'
import { connect } from 'react-redux'
import { DEFAULT_API_ERROR } from '../constants/string'
import { dimension } from '../styles/common-variables'
import { InfoText } from '../components/form-info'
import { localStorageKeys } from '../config/config'
import { scheduleRenewToken, getItem } from '../utils/tokenManager'
import { Title } from '../components/form-widgets'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import url from 'url'

const _ = {
  get,
}

const { authInfo, redirectLocation } = localStorageKeys
const { formWidth } = dimension

const Container = styled.div`
  width: ${formWidth};
`

const LocalInfoText = InfoText.extend`
  text-align: left;
`

const BACKUP_INFO = '系統將跳頁至報導者首頁，請稍候'

class ActivePage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      authError: '',
    }
  }
  componentDidMount() {
    const { apiUrl, location, activate, router, destination, errorOccurs, renewPath, renewTokenAction } = this.props
    const email = _.get(location, 'query.email', '')
    const token = _.get(location, 'query.token', '')
    const redirectLocationString = localStorage.getItem(redirectLocation)
    const redirectLocationObj = JSON.parse(redirectLocationString)
    localStorage.removeItem(redirectLocation)
    // account activation
    if (token) {
      activate(email, token, apiUrl, this.props.activationPath)
        .then(() => {
          const authInfoString = getItem(authInfo)
          if (authInfoString) {
            scheduleRenewToken(
              6,
              () => {
                if (getItem(authInfo)) {
                  renewTokenAction(apiUrl, renewPath, JSON.parse(getItem(authInfo)))
                }
              },
            )
          }
          if (destination) {
            const destObj = url.parse(destination)
            const path = _.get(destObj, 'pathname', '/')
            router.push(path)
            return
          }
          if (redirectLocation) {
            const path = _.get(redirectLocationObj, 'destination', '/')
            router.push(path)
            return
          }
          router.push('/')
        })
        .catch(() => {
          this.setState({
            authError: DEFAULT_API_ERROR,
          })
          errorOccurs()
        })
    } else {
      // oAuth Activation
      const oAuthDestination = _.get(redirectLocationObj, 'destination', '')
      if (oAuthDestination) {
        const destObj = url.parse(oAuthDestination)
        const path = _.get(destObj, 'pathname', '/')
        router.push(path)
      } else {
        router.push('/')
      }
    }
  }
  render() {
    const { authError } = this.state
    if (authError) {
      return (
        <Container>
          <Title>
            錯誤
          </Title>
          <LocalInfoText>
            {authError}
          </LocalInfoText>
        </Container>
      )
    }
    return (
      <Container>
        {BACKUP_INFO}
      </Container>
    )
  }
}

ActivePage.defaultProps = {
  location: {},
  browserHistory: {},
  destination: '',
  nextRouter: {},
  apiUrl: '',
  activationPath: '',
  renewTokenAction: () => {},
}

ActivePage.propTypes = {
  location: PropTypes.object.isRequired,
  activate: PropTypes.func.isRequired,
  destination: PropTypes.string,
  apiUrl: PropTypes.string,
  activationPath: PropTypes.string,
  router: PropTypes.object.isRequired,
  errorOccurs: PropTypes.func.isRequired,
  renewPath: PropTypes.string.isRequired,
  renewTokenAction: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    apiUrl: _.get(state, 'authConfigure.apiUrl', ''),
    renewPath: _.get(state, 'authConfigure.renew', ''),
    activationPath: _.get(state, 'authConfigure.activate', ''),
  }
}

export default connect(mapStateToProps, { activate: activateUser, renewTokenAction: renewToken })(ActivePage)
