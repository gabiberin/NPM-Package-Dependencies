import { createApp } from './app';
import * as getPort from 'get-port';
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  // Initialise the server framework and routing
  const server = createApp();

  // Attempt to get the default port, otherwise choose for us
  const port = await getPort({ port: ( typeof process.env.DEFAULT_PORT === 'number' ) ?  process.env.DEFAULT_PORT : 3000 });

  server.listen(port);

  console.info(`Server listening at http://localhost:${port}`);
}

main();
