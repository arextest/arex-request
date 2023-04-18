import { State } from './ConfigProvider';

export const defaultState: State = {
  request: {
    preRequestScript: '',
    v: '',
    headers: [],
    name: '',
    body: {
      contentType: 'application/json',
      body: '',
    },
    auth: {
      authActive: false,
      authType: 'none',
    },
    testScript: '',
    endpoint: '',
    method: '',
    params: [],
  },
  edited: false,
  response: null,
  environment: { name: 'dev', variables: [{ key: 'name', value: 'ssss' }] },
  theme: 'light',
  // locale: 'en',
  locale: 'en',
  testResult: null,
};
