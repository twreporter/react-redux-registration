import React from 'react'
import styled from 'styled-components'
import { mediaScreen } from '../styles/style-utils'
import { FORM_WIDTH } from '../styles/common-variables'
import PropTypes from 'prop-types'

const Page = styled.div`
  min-height: 666px;
  position: relative;
  padding: 40px;
  display: flex;
  justify-content: center;
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
