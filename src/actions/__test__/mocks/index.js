export const mockDefaultStates  = {
  initialState: {
    authError: {
      errorMessages: '',
      webStatus: null
    },
    messages: '',
    authenticated: false,
    authProcess: '',
  }
}

export const mockResponseSet = {
  signup: {
    res: {
      ok: true
    }
  },
  authorizedAccount: {
    jwt: 'mock token',
    email: 'mock@gmail.com',
    id: 'mockId',
    firstname: 'Robert',
    lastname: 'Kahn'
  }
}

export const mockParameterSet = {
  mockAccount: {
    email: 'mock@gmail.com',
    password: 'mock password'
  },
  mockQuery: {
    email: 'mockEmail',
    activeCode: 'mockActivationCode'
  }
}
