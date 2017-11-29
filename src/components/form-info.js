import styled from 'styled-components'
import { colors } from '../styles/common-variables'

export const ValidationError = styled.div`
  margin-top: 10px;
  font-size: 14px;
  letter-spacing: 0.6px;
  text-align: left;
  color: #c7000a;
`

export const AuthError = styled.div`
  margin: 15px 0 15px 0;
  color: ${colors.alertRed};
  display: block;
  width: 275px;
  height: 55px;
  text-align: center;
  line-height: 55px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.6px;
  border: 1px solid ${colors.alertRed};
`

export const CompletionText = styled.div`
  width: 275px;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.53;
  letter-spacing: 0.6px;
  text-align: left;
  color: ${colors.textBlack};
`

export const InfoText = styled.div`
  font-size: 15px;
  font-weight: bold;
  line-height: 1.53;
  letter-spacing: 0.6px;
  text-align: left;
  color: ${colors.textBlack};
  margin-bottom: 25px;
  word-break: break-all;
`
