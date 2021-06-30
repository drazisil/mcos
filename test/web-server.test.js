// Mco-server is a game server, written from scratch, for an old game
// Copyright (C) <2017-2018>  <Joseph W Becher>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import mock, {restore} from 'mock-fs';
import {expect, describe, it} from '@jest/globals';
import {AuthLogin} from '../src/services/AuthLogin/auth-login.js';
import {fakeConfig} from './helpers.js';

describe('WebServer', () => {
  const webServer = new AuthLogin(fakeConfig);

  it('_sslOptions()', async () => {
    /**
     * @type {IServerConfig}
     */
    const config = {
      certFilename: '/cert/cert.pem',
      privateKeyFilename: '/cert/private.key',
      ipServer: '',
      publicKeyFilename: '',
      connectionURL: '',
    };

    //  Deepcode ignore WrongNumberOfArgs/test: false positive
    mock({
      '/cert/': {},
    });
    try {
      await webServer._sslOptions(config);
    } catch (error) {
      expect(error).toMatch(/cert.pem/);
    }

    restore();
    //  Deepcode ignore WrongNumberOfArgs/test: false positive
    mock({
      '/cert/cert.pem': 'stuff',
    });
    try {
      await webServer._sslOptions(config);
    } catch (error) {
      expect(error).toMatch(/private.key/);
    }

    restore();
    //  Deepcode ignore WrongNumberOfArgs/test: false positive
    mock({
      '/cert/cert.pem': 'stuff',
      '/cert/private.key': 'stuff',
    });
    try {
      await webServer._sslOptions(config);
    } catch (error) {
      expect(error).toMatch(/private.key/);
    }

    restore();
  });
});
