import {afterEach, beforeEach, clearStore, describe, logStore, test} from 'matchstick-as';

import handleRoleGranted from './handleRoleGranted';
import handleRoleRevoked from './handleRoleRevoked';


describe('Whitelist', () => {
  beforeEach(() => {
    clearStore();
  });

  afterEach(() => {
    logStore();
  });

  test('handleRoleGranted', handleRoleGranted);
  test('handleRoleRevoked', handleRoleRevoked);
});