import { activateUser } from '../actions'
import { connect } from 'react-redux'
import { DEFAULT_API_ERROR } from '../constants/string'
import { FORM_WIDTH } from '../styles/common-variables'
import { get } from 'lodash'
import { InfoText } from '../components/form-info'
import { LOCALSTORAGE_KEY_REDIRECT_LOCATION } from '../config/config'
import { Title } from '../components/form-widgets'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import url from 'url'

const _ = {
  get,
}

const Container = styled.div`
  width: ${FORM_WIDTH};
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
    const { location, activate, router, destination, errorOccurs } = this.props
    const email = _.get(location, 'query.email', '')
    const token = _.get(location, 'query.token', '')
    const redirectLocation = localStorage.getItem(LOCALSTORAGE_KEY_REDIRECT_LOCATION)
    const redirectLocationObj = JSON.parse(redirectLocation)
    localStorage.removeItem(LOCALSTORAGE_KEY_REDIRECT_LOCATION)
    // account activation
    if (token) {
      activate(email, token, this.props.apiUrl, this.props.activationPath)
        .then(() => {
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
}

ActivePage.propTypes = {
  location: PropTypes.object.isRequired,
  activate: PropTypes.func.isRequired,
  destination: PropTypes.string,
  apiUrl: PropTypes.string,
  activationPath: PropTypes.string,
  router: PropTypes.object.isRequired,
  errorOccurs: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    apiUrl: _.get(state, 'authConfigure.apiUrl', ''),
    activationPath: _.get(state, 'authConfigure.activate', ''),
  }
}

export default connect(mapStateToProps, { activate: activateUser })(ActivePage)
