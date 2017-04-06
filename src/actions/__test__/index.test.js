/*global describe, afterEach, it, context*/
'use strict'
import * as types from '../types'
import * as actions from '../index'
import { messagesSet } from '../constant'
import { mockDefaultStates, mockResponseSet, mockParameterSet } from './mocks'
import { apiHost, apiPort, apiEndPoint } from '../../../config'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { expect } from 'chai'
import nock from 'nock'

const API_URL = `${apiHost}:${apiPort}`

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Action Testing:SignUp, Activate, Signout, SignIn', function() {
  before(() => {
    global.localStorage = (function() {
      let storage = {}
      return {
        setItem: function(key, value) {
          storage[key] = value || '';
        },
        getItem: function(key) {
          return key in storage ? storage[key] : null;
        },
        removeItem: function(key) {
          delete storage[key];
        },
        clear: function() {
          storage = {}
        },
        length: function() {
          return storage.length
        }
      }
    }())
  })

  afterEach(() => {
    nock.cleanAll()
    localStorage.clear()
  })
  context('Signup Success: ', function() {
    it('Actual actions should be same as expected actions', function() {
      const mockDefaultState = mockDefaultStates.initialState
      const mockAccount = mockParameterSet.mockAccount
      nock(API_URL)
        .post(apiEndPoint.signup, {
          email: mockAccount.email,
          password: mockAccount.password
        })
        .reply(200, mockResponseSet.signup)
      const store = mockStore(mockDefaultState)
      return store.dispatch(actions.signupUser(mockAccount))
        .then(() => {
          const authReq = store.getActions()[0]
          const fetchMessage = store.getActions()[1]
          const expectedActions = [
            {
              type: types.AUTH_REQ,
              payload: messagesSet.request.signup
            },
            {
              type: types.FETCH_MESSAGE,
              payload: messagesSet.app.afterSignUp
            }
          ]

          expect(authReq).to.deep.equal(expectedActions[0])
          expect(fetchMessage).to.deep.equal(expectedActions[1])
        })
    })
  })

  context('Signup Failed: ', function() {
    it('Actual actions should be same as expected actions', function() {
      const mockDefaultState = mockDefaultStates.initialState
      const mockAccount = mockParameterSet.mockAccount
      nock(API_URL)
        .post(apiEndPoint.signup, {
          email: mockAccount.email,
          password: mockAccount.password
        })
        .replyWithError({ 'message': 'this is error message for testing', 'status': 404 })
      const store = mockStore(mockDefaultState)
      return store.dispatch(actions.signupUser(mockAccount))
        .then(() => {
          const authReq = store.getActions()[0]
          const authError = store.getActions()[1]
          const expectedActions = [
            {
              type: types.AUTH_REQ,
              payload: messagesSet.request.signup
            },
            {
              type: types.AUTH_ERROR,
              payload: { 'errorMessages': 'this is error message for testing', 'webStatus': 404 }
            }
          ]

          expect(authReq).to.deep.equal(expectedActions[0])
          expect(authError).to.deep.equal(expectedActions[1])
        })
    })
  })

  context('Activate Success: ', function() {
    it('Actual actions should be same as expected actions. Content in mockLocalStorage shoule be same as expected result', function() {
      const mockDefaultState = mockDefaultStates.initialState
      nock(API_URL)
        .get(apiEndPoint.activate)
        .query({ email:mockParameterSet.mockQuery.email, token: mockParameterSet.mockQuery.activeCode })
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
              payload: messagesSet.request.activate
            },
            {
              type: types.AUTH_USER
            }
          ]
          expect(authReq).to.deep.equal(expectedActions[0])
          expect(authUser).to.deep.equal(expectedActions[1])
        })
    })
  })

  context('Activate Failed: ', function() {
    it('Actual actions should be same as expected actions', function() {
      const mockDefaultState = mockDefaultStates.initialState
      nock(API_URL)
        .get(apiEndPoint.activate)
        .query({ email:mockParameterSet.mockQuery.email, token: mockParameterSet.mockQuery.activeCode })
        .replyWithError({ 'message': 'this is error message for testing', 'status': 404 })
      const store = mockStore(mockDefaultState)
      return store.dispatch(actions.activateUser(mockParameterSet.mockQuery, null))
        .then(() => {
          const authReq = store.getActions()[0]
          const authError = store.getActions()[1]
          const expectedActions = [
            {
              type: types.AUTH_REQ,
              payload: messagesSet.request.activate
            },
            {
              type: types.AUTH_ERROR,
              payload: { 'errorMessages': 'this is error message for testing', 'webStatus': 404 }
            }
          ]
          expect(authReq).to.deep.equal(expectedActions[0])
          expect(authError).to.deep.equal(expectedActions[1])
        })
    })
  })

  context('Signin Success' , function() {
    it('Actual actions should be same as expected actions, Content in mockLocalStorage shoule be same as expected result', function() {
      const mockDefaultState = mockDefaultStates.initialState
      const mockAccount = mockParameterSet.mockAccount
      nock(API_URL)
        .post(apiEndPoint.signin, {
          email: mockAccount.email,
          password: mockAccount.password
        })
        .reply(200, mockResponseSet.authorizedAccount)
      const store = mockStore(mockDefaultState)
      return store.dispatch(actions.signinUser(mockAccount, () => {
        expect({ ...JSON.parse(localStorage.getItem('accountInfo')), jwt: localStorage.getItem('token') }).to.deep.equal(mockResponseSet.authorizedAccount)
      }))
        .then(() => {
          const authReq = store.getActions()[0]
          const authUser = store.getActions()[1]
          const expectedActions = [
            {
              type: types.AUTH_REQ,
              payload: messagesSet.request.signin
            },
            {
              type: types.AUTH_USER,
            }
          ]

          expect(authReq).to.deep.equal(expectedActions[0])
          expect(authUser).to.deep.equal(expectedActions[1])
        })
    })
  })

  context('Signin Failed: ', function() {
    it('Actual actions should be same as expected actions', function() {
      const mockDefaultState = mockDefaultStates.initialState
      const mockAccount = mockParameterSet.mockAccount
      nock(API_URL)
        .post(apiEndPoint.signin, {
          email: mockAccount.email,
          password: mockAccount.password
        })
        .replyWithError({ 'message': 'this is error message for testing', 'status': 404 })
      const store = mockStore(mockDefaultState)
      return store.dispatch(actions.signinUser(mockAccount, null))
        .then(() => {
          const authReq = store.getActions()[0]
          const authError = store.getActions()[1]
          const expectedActions = [
            {
              type: types.AUTH_REQ,
              payload: messagesSet.request.signin
            },
            {
              type: types.AUTH_ERROR,
              payload: { 'errorMessages': 'this is error message for testing', 'webStatus': 404 }
            }
          ]
          expect(authReq).to.deep.equal(expectedActions[0])
          expect(authError).to.deep.equal(expectedActions[1])
        })
    })
  })

})
