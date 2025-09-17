#!/bin/bash

URL="http://localhost:3000/simulate"
REQUESTS=10000       # total number of requests
CONCURRENCY=100     # number of requests at the same time

echo "Starting stress test: $REQUESTS requests with concurrency $CONCURRENCY"
echo

for ((i=1; i<=REQUESTS; i++)); do
  (
    curl --silent --show-error --request POST "$URL"
  ) &

  # limit concurrency
  if (( i % CONCURRENCY == 0 )); then
    wait
  fi 
done

wait
echo "Stress test finished."
