#!/bin/bash

export PATH=/usr/local/bin:/opt/local/bin/phantomjs:$PATH;
 
npm install
grunt test --no-color

