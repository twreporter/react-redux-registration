/* global describe, afterEach, it, context */
/*
import * as types from '../types'
import * as actions from '../index'
import { messagesSet } from '../../constants/messageSet'
import { mockDefaultStates, mockResponseSet, mockParameterSet } from './mocks'
import { apiHost, apiPort, apiEndPoint } from './mocks/config'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { expect } from 'chai'
import nock from 'nock'

const API_URL = `${apiHost}:${apiPort}`

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Action Testing:signUp, Activate, Signout, SignIn', () => {
  before(() => {
    global.localStorage = (() => {
      let storage = {}
      return {
        setItem(key, value) {
          storage[key] = value || ''
        },
        getItem(key) {
          return key in storage ? storage[key] : null
        },
        removeItem(key) {
          delete storage[key]
        },
        clear() {
          storage = {}
        },
        length() {
          return storage.length
        },
      }
    })()
  })

  afterEach(() => {
    nock.cleanAll()
    localStorage.clear()
  })
  context('signUp Success: ', () => {
    it('Actual actions should be same as expected actions', () => {
      const mockDefaultState = mockDefaultStates.initialState
      const mockAccount = mockParameterSet.mockAccount
      const { email, password } = mockAccount
      nock(API_URL)
        .post(apiEndPoint.signUp, {
          email,
          password,
        })
        .reply(200, mockResponseSet.signUp)
      const store = mockStore(mockDefaultState)
      return store.dispatch(actions.signUpUser(email, password, API_URL, apiEndPoint.signUp))
        .then(() => {
          const authReq = store.getActions()[0]
          const expectedActions = [
            {
              type: types.AUTH_REQ,
              payload: {
                authProcess: messagesSet.authProcess.signUpReq,
              },
            },
          ]
          expect(authReq).to.deep.equal(expectedActions[0])
          // expect(fetchMessage).to.deep.equal(expectedActions[1])
        })
        .catch((error) => {
          const webStatuCode = _.get(error, 'status.status', 500)
          const statusText = _.get(error, 'status.status')
          if (webStatuCode === 409) {

          }
        })
    })
  })

  // context('Signup Failed: ', () => {
  //   it('Actual actions should be same as expected actions', () => {
  //     const mockDefaultState = mockDefaultStates.initialState
  //     const mockAccount = mockParameterSet.mockAccount
  //     nock(API_URL)
  //       .post(apiEndPoint.signUp, {
  //         email: mockAccount.email,
  //         password: mockAccount.password,
  //       })
  //       .replyWithError({ message: 'this is error message for testing', status: 404 })
  //     const store = mockStore(mockDefaultState)
  //     return store.dispatch(actions.signUpUser(mockAccount))
  //       .then(() => {
  //         const authReq = store.getActions()[0]
  //         const authError = store.getActions()[1]
  //         const expectedActions = [
  //           {
  //             type: types.AUTH_REQ,
  //             payload: messagesSet.authProcess.signUp,
  //           },
  //           {
  //             type: types.AUTH_ERROR,
  //             payload: { errorMessages: 'this is error message for testing', webStatus: 404 },
  //           },
  //         ]
  //
  //         expect(authReq).to.deep.equal(expectedActions[0])
  //         expect(authError).to.deep.equal(expectedActions[1])
  //       })
  //   })
  // })
  context('Activate Success: ', () => {
    it('Actual actions should be same as expected actions. Content in mockLocalStorage shoule be same as expected result', () => {
      const mockDefaultState = mockDefaultStates.initialState
      nock(API_URL)
        .get(apiEndPoint.activate)
        .query({ email: mockParameterSet.mockQuery.email, token: mockParameterSet.mockQuery.activeCode })
        .reply(200, mockResponseSet.authorizedAccount)
      const store = mockStore(mockDefaultState)
      return store.dispatch(actions.activateUser(mockParameterSet.mockQuery, () => {
        expect({ ...JSON.parse(localStorage.getItem('accountInfo')), jwt: localStorage.getItem('token') }).to.deep.equal(mockResponseSet.authorizedAccount)
      }))
        .then(() => {
          const authReq = store.getActions()[0]
          const authUser = store.getActions()[1]
          const expectedActions = [
            {
              type: types.AUTH_REQ,
              payload: messagesSet.authProcess.activate,
            },
            {
              type: types.AUTH_USER,
            },
          ]
          expect(authReq).to.deep.equal(expectedActions[0])
          expect(authUser).to.deep.equal(expectedActions[1])
        })
    })
  })

  context('Activate Failed: ', () => {
    it('Actual actions should be same as expected actions', () => {
      const mockDefaultState = mockDefaultStates.initialState
      nock(API_URL)
        .get(apiEndPoint.activate)
        .query({ email: mockParameterSet.mockQuery.email, token: mockParameterSet.mockQuery.activeCode })
        .replyWithError({ message: 'this is error message for testing', status: 404 })
      const store = mockStore(mockDefaultState)
      return store.dispatch(actions.activateUser(mockParameterSet.mockQuery, null))
        .then(() => {
          const authReq = store.getActions()[0]
          const authError = store.getActions()[1]
          const expectedActions = [
            {
              type: types.AUTH_REQ,
              payload: messagesSet.authProcess.activate,
            },
            {
              type: types.AUTH_ERROR,
              payload: { errorMessages: 'this is error message for testing', webStatus: 404 },
            },
          ]
          expect(authReq).to.deep.equal(expectedActions[0])
          expect(authError).to.deep.equal(expectedActions[1])
        })
    })
  })

  context('SignIn Success', () => {
    it('Actual actions should be same as expected actions, Content in mockLocalStorage shoule be same as expected result', () => {
      const mockDefaultState = mockDefaultStates.initialState
      const mockAccount = mockParameterSet.mockAccount
      nock(API_URL)
        .post(apiEndPoint.signIn, {
          email: mockAccount.email,
          password: mockAccount.password,
        })
        .reply(200, mockResponseSet.authorizedAccount)
      const store = mockStore(mockDefaultState)
      return store.dispatch(actions.signInUser(mockAccount, () => {
        expect({ ...JSON.parse(localStorage.getItem('accountInfo')), jwt: localStorage.getItem('token') }).to.deep.equal(mockResponseSet.authorizedAccount)
      }))
        .then(() => {
          const authReq = store.getActions()[0]
          const authUser = store.getActions()[1]
          const expectedActions = [
            {
              type: types.AUTH_REQ,
              payload: messagesSet.authProcess.signIn,
            },
            {
              type: types.AUTH_USER,
            },
          ]

          expect(authReq).to.deep.equal(expectedActions[0])
          expect(authUser).to.deep.equal(expectedActions[1])
        })
    })
  })

  context('Signin Failed: ', () => {
    it('Actual actions should be same as expected actions', () => {
      const mockDefaultState = mockDefaultStates.initialState
      const mockAccount = mockParameterSet.mockAccount
      nock(API_URL)
        .post(apiEndPoint.signIn, {
          email: mockAccount.email,
          password: mockAccount.password,
        })
        .replyWithError({ message: 'this is error message for testing', status: 404 })
      const store = mockStore(mockDefaultState)
      return store.dispatch(actions.signInUser(mockAccount, null))
        .then(() => {
          const authReq = store.getActions()[0]
          const authError = store.getActions()[1]
          const expectedActions = [
            {
              type: types.AUTH_REQ,
              payload: messagesSet.authProcess.signIn,
            },
            {
              type: types.AUTH_ERROR,
              payload: { errorMessages: 'this is error message for testing', webStatus: 404 },
            },
          ]
          expect(authReq).to.deep.equal(expectedActions[0])
          expect(authError).to.deep.equal(expectedActions[1])
        })
    })
  })
})
*/
