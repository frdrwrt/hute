#!/bin/sh -l
set -eu 
./hute start-test
yarn
./hute test-server