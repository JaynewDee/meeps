#!/bin/bash

set -e

cd client
yarn dev &
cd ../server
node server.js