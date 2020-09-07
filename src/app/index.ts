import * as path from 'path';
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan'
import { getPackage } from './endpoints/package';

/**
 * Bootstrap the application framework
 */
export function createApp() {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
  }))

  // Package API
  app.get('/api/package/:name/:version', getPackage);

  // Handle production
  //if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(path.resolve(__dirname + '/../public/')));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname + '/../public/index.html')));
  //}

  return app;
}
