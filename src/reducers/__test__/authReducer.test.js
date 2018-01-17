/* global describe, it, context */
/*
'use strict'
import { expect } from 'chai'
import reducer  from '../authReducer'
import { mockActionSet, mockExpStateSet } from './mocks/authReducer'


describe('Plain Authentication Reudcer Testing', function() {
  const initialState = mockExpStateSet.initialState

  context('With Null || undefined actions', function() {
    it('should return state which match expect state in mockup', function() {
      expect(
        reducer(undefined, {})
      ).to.deep.equal(initialState)
    })
  })

  context('With AUTH_REQ action', function() {
    it('should return state which match expect state in mockup', function() {
      const expectedState = mockExpStateSet.authReq
      expect(
        reducer(initialState, mockActionSet.AUTH_REQ)
      ).to.deep.equal(expectedState)
    })
  })

  context('With AUTH_USER action', function() {
    it('should return state which match expect state in mockup', function() {
      const afterAuthReqState = reducer(initialState, mockActionSet.AUTH_REQ)
      const expectedState = mockExpStateSet.authUser
      expect(
        reducer(afterAuthReqState, mockActionSet.AUTH_USER)
      ).to.deep.equal(expectedState)
    })
  })

  context('With UNAUTH_USER action', function() {
    it('should return state which match expect state in mockup', function() {
      const afterAuthUserState = reducer(initialState, mockActionSet.AUTH_USER)
      const expectedState = mockExpStateSet.unauthUser
      expect(
        reducer(afterAuthUserState, mockActionSet.UNAUTH_USER)
      ).to.deep.equal(expectedState)
    })
  })

  context('With AUTH_ERROR action', function() {
    it('should return state which match expect state in mockup', function() {
      const afterAuthReqState = reducer(initialState, mockActionSet.AUTH_REQ)
      const expectedState = { ...mockExpStateSet.authError, authProcess:afterAuthReqState.authProcess }
      expect(
        reducer(afterAuthReqState, mockActionSet.AUTH_ERROR)
      ).to.deep.equal(expectedState)
    })
  })

  context('With FETCH_MESSAGE action', function() {
    it('should return state which match expect state in mockup', function() {
      // for now, is after signup specfically
      const afterAuthReqState = reducer(initialState, mockActionSet.AUTH_REQ)
      const expectedState = { ...mockExpStateSet.fetchMessage, authProcess:afterAuthReqState.authProcess }
      expect(
        reducer(afterAuthReqState, mockActionSet.FETCH_MESSAGE)
      ).to.deep.equal(expectedState)
    })
  })
})

*/
