# ChainSpin Framework

> A simple framework for building Solidity projects.

## Requirements

* NodeJS v10.3.0+
* Linux or Mac OS X.

## Installation

Install the command-line tool globaly.

```
$ npm install -g chainspin-cli
```

Create a new project.

```
$ mkdir project1
$ cd project1
$ chainspin init
$ npm install
```

## Usage

Run tests.

```
$ npm run test
```

Compile contracts.

```
$ npm run compile
```

## Development

```
$ npx lerna run build
$ npx lerna publish --force-publish
```
