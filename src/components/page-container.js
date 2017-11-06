import React from 'react'
import styled from 'styled-components'
import { mediaScreen } from '../styles/style-utils'
import { FORM_WIDTH } from '../styles/common-variables'
import PropTypes from 'prop-types'


const Page = styled.div`
  min-height: 666px;
  position: relative;
  padding: 20px 0 104px 0;
  display: flex;
  justify-content: center;
  ${mediaScreen.tablet`
    padding: 40px 0 104px 0;
  `}
`

const Container = styled.div`
  width: ${FORM_WIDTH};
`

const PageContainer = ({ children }) => {
  return (
    <Page>
      <Container>
        {children}
      </Container>
    </Page>
  )
}

PageContainer.propTypes = {
  children: PropTypes.element.isRequired,
}

export default PageContainer
