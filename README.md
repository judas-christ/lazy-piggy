# Lazy Piggy 🐷 [![Build Status](https://travis-ci.org/judas-christ/lazy-piggy.svg?branch=master)](https://travis-ci.org/judas-christ/lazy-piggy)

> A simple web server for static sites with optional basic authentication

## Why?

Perfect you need a simple static web server with basic authentication, such as for previewing a site under development.

## Usage

Lazy Piggy can be used from the command line or from node. All options are available in all modes.

### Options

|Option  | Description | Default |
|-|-|-|
| `root` | Root folder to serve. | `'public'`
| `host` | Hostname to listen to. | `'localhost'`
| `port` | Port to listen to. | `3000` or the environment variable `PORT` when available.
| `auth` | Basic authentication configuration. |
| `auth.realm` | Basic authentication realm. | `'Lazy Piggy'`
| `auth.users` | User/Password map to accept. If not set, basic auth is turned off. | `undefined`

Options can be specified as command line parameters, as an object, in an `.lazypiggyrc` file or as environment variables.

### Command line

Run Lazy Piggy with:

```bash
$ lazy-piggy
```

### Node API

Use Lazy Piggy in node like so:

```js
const lazyPiggy = require('lazy-piggy')
// do other stuff and set options
// ...
// create and start server
const server = lazyPiggy(options)
// ...
// stop server
server.close()
```
