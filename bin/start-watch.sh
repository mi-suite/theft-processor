#!/bin/bash
./node_modules/.bin/pm2 start www/index.ts --name theft-processor --watch
