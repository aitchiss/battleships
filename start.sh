#!/bin/sh
echo "installing npm modules in top level..."
npm install

echo "installing npm modules in client..."
cd "client"
npm install

echo "starting server..."
cd ".."
npm start

