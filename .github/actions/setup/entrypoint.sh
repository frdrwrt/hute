#!/bin/sh -l
set -eu 
./hute install
./hute start-test
./hute test-server