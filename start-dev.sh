#!/bin/bash

set -e

cd client
yarn dev &
cd ../server
nodemon server.js