# client-server-starter

This project is intended to be a sensible starter for a Client + Server Web Application using Svelte, Routify, and Express.

## Packages

### Client

The Client package is a modified Routify starter from Stackmix using the following options selected:

- Bundler: Rollup
- Template: Navigation
- Features: tailwindcss

The following significant changes were made to the resulting starter:

- Tests were removed from the package
- Spassr was removed from the package
- Rollup now copies the files from the static folder to the dist folder on build

### Server

The Server package is a simple Express application configured to parse cookies, json request, urlencoded request, and serve static files from the dist folder within the Client package.
