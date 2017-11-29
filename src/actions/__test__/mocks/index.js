export const mockDefaultStates = {
  initialState: {
    authenticated: false,
    authProcess: '',
    authType: '',
    authInfo: {},
    authError: {
      errorMessages: '',
      webStatus: null,
    },
    tokenStatus: '',
  },
}

export const mockResponseSet = {
  signUp: {
    res: {
      ok: true,
    },
  },
  authorizedAccount: {
    jwt: 'mock token',
    email: 'mock@gmail.com',
    id: 'mockId',
    firstname: 'Robert',
    lastname: 'Kahn',
  },
}

export const mockParameterSet = {
  mockAccount: {
    email: 'mock@gmail.com',
    password: 'mock password',
  },
  mockQuery: {
    email: 'mockEmail',
    activeCode: 'mockActivationCode',
  },
}

