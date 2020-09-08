# NPM Package Dependencies
This project is a fork from https://github.com/snyk/jobs/tree/master/exercises/npm-registry.

🌟 Now available in Heroku: https://npm-package-dependencies.herokuapp.com/react/latest

## Task implementation
- Implemented a basic tree data structure, with helper functions that handle the creation process.
- The root package is fetched first, then all the dependencies are fetched asynchronously.
- Packages are kept in an LRU cache once fetched (for a limited time).

## Notes
- The client side is a vue project nested inside the /client folder. Once built (npm run build), it outputs the files into the dist/public folder.
