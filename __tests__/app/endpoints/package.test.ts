import * as getPort from 'get-port';
import got from 'got';
import { Server } from 'http';

import { createApp } from '../../../src/app';

jest.setTimeout(30000)

describe('/package/:name/:version endpoint', () => {
  let server: Server;
  let port: number;

  beforeAll(async (done) => {
    port = await getPort();
    server = createApp().listen(port, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('responds', async () => {
    const packageName = 'js-tokens';
    const packageVersion = '4.0.0';
    
    const res: any = await got(
      `http://localhost:${port}/api/package/${packageName}/${packageVersion}`,
    ).json();

    expect(res.name).toBe(`${packageName}@${packageVersion}`);
  });

  it('returns dependencies', async () => {
    const packageName = 'react';
    const packageVersion = '16.13.0';

    const res: any = await got(
      `http://localhost:${port}/api/package/${packageName}/${packageVersion}`,
    ).json();

    expect(res.children.length).toBe(3);
    expect(res.children[0].name).toBe('loose-envify@1.4.0');
    expect(res.children[0].children.length).toBe(1);
    expect(res.children[0].children[0].name).toBe('js-tokens@4.0.0');
  });

  it('returns dependencies of scoped packages', async () => {
    const scopeName = '@babel';
    const packageName = 'core';
    const packageVersion = '7.11.6';

    const res: any = await got(
      `http://localhost:${port}/api/package/${scopeName}/${packageName}/${packageVersion}`,
    ).json();

    expect(res.children.length).toBe(16);
    expect(res.children[0].name).toBe('@babel/code-frame@7.10.4');
    expect(res.children[0].children.length).toBe(1);
    expect(res.children[0].children[0].name).toBe('@babel/highlight@7.10.4');
  });

  it('returns fail message on invalid package', async () => {
    const packageName = 'my-invalid-package';
    const packageVersion = '16.13.0';

    const res: any = await got(
      `http://localhost:${port}/api/package/${packageName}/${packageVersion}`,
      {
        retry: 0,
        throwHttpErrors: false
      }
    );
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toBe('Error: Invalid package or version');
  });

  it('returns fail message on invalid scoped package', async () => {
    const scopeName = '@babel';
    const packageName = 'notcore';
    const packageVersion = '7.11.6';


    const res: any = await got(
      `http://localhost:${port}/api/package/${scopeName}/${packageName}/${packageVersion}`,
      {
        retry: 0,
        throwHttpErrors: false
      }
    );
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toBe('Error: Invalid package or version');
  });
});
