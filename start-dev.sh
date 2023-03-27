#!/bin/bash

set -e

cd client
yarn dev &
cd ../server
npm run start