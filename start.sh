#!/bin/sh
echo "installing npm modules in top level..."
npm install

echo "installing npm modules in client..."
cd "client"
npm install

echo "starting server..."
cd ".."
npm start

echo "opening player 1 and player 2 browser windows..."

open http://localhost:3000
open http://localhost:3000

echo "finished"