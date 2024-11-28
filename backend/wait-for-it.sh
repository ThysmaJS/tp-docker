#!/usr/bin/env bash

HOST=$1
PORT=$2
shift 2
CMD="$@"

while ! nc -z $HOST $PORT; do
    echo "Waiting for $HOST:$PORT..."
    sleep 1
done

exec $CMD
