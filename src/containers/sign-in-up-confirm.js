import { dimension } from '../styles/common-variables'
import { InfoText } from '../components/form-info'
import { Title, NormalButton } from '../components/form-widgets'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  get,
}

// to keep up with mailchimp machenism, the input need to be named as 'EMAIL'
const mailChimpURL = '//twreporter.us14.list-manage.com/subscribe/post?u=4da5a7d3b98dbc9fdad009e7e&id=e0eb0c8c32'
const Form = styled.form`
  width: ${dimension.formWidth};
`

const genInfoText = (action, email, checked) => {
  if (action === 'signIn') {
    return `我們已寄信至 ${email} ，信件內含有一登入連結，請點擊連結，登入報導者`
  }
  if (action === 'signUp') {
    if (checked === 'true') {
      return `我們已寄信至 ${email} ，信件內含有一確認連結，請點選連結，完成註冊。<br>並請點擊下方按鈕，確認訂閱報導者電子報。`
    }
    return `我們已寄信至 ${email} ，信件內含有一確認連結，請點選連結，完成註冊。`
  }
  return '系統錯誤'
}
const generateTextObj = (action, email, checked) => {
  const titleText = '檢視您的信箱'
  const infoText = genInfoText(action, email, checked)
  const buttonText = '確認'
  return {
    titleText,
    infoText,
    buttonText,
  }
}

const Hide = styled.div`
  visibility: hidden;
`

class Confirmation extends React.Component {
  constructor(props) {
    super(props)
    this.form = {}
    this.onConfirmClick = this._onConfirmClick.bind(this)
    this.handleSubmit = this._handleSubmit.bind(this)
  }

  _handleSubmit(e) {
    e.preventDefault()
  }

  _onConfirmClick() {
    const { location, router } = this.props
    const checked = _.get(location, 'query.checked', false)
    if (checked === 'true') {
      this.form.submit()
    }
    router.push('/')
  }

  render() {
    const { location } = this.props
    const email = _.get(location, 'query.email', '')
    const action = _.get(location, 'query.action', '')
    const checked = _.get(location, 'query.checked', '')
    const textObj = generateTextObj(action, email, checked)
    return (
      <Form
        action={mailChimpURL}
        method="post"
        name="subscribe-form"
        target="_blank"
        onSubmit={this.handleSubmit}
        novalidate
        innerRef={(node) => { this.form = node }}
      >
        <Title>
          {textObj.titleText}
        </Title>
        <InfoText dangerouslySetInnerHTML={{ __html: textObj.infoText }} />
        {
          checked === 'true' ?
            <div>
              <NormalButton
                onClick={this.onConfirmClick}
              >
                {textObj.buttonText}
              </NormalButton>
              <Hide>
                <input
                  id={'EMAIL'}
                  type="email"
                  name={'EMAIL'}
                  defaultValue={email}
                />
              </Hide>
            </div>
            :
            null
        }
      </Form>
    )
  }
}

Confirmation.propTypes = {
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
}

export default Confirmation
