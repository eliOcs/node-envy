# ENVy

Handle your environment properties from a simple .json file.

## Installation

To install simply use the node package manager (NPM):
```
	[sudo] npm install envy
```

## Motivation

There is no standard way of managing in node environment properties per 
project. With envy you can easily cover this necessity for projects that have 
to handle many environments.

## Usage

``` js
	var envy = require('envy');

	envy.load('config.json');
```

## Future features

We plan on extending the current features and include:

	- Reload configuration files when modified.
