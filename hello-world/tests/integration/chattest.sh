#!/bin/bash

# Define the URL to call and the expected result
url="https://au3a2mmksg.execute-api.eu-west-1.amazonaws.com/Prod/hello/"
expected_result="hello paul"

# Make the HTTP request using curl and store the response
response=$(curl -s "$url")

# Extract message value from json 
actual_value=$(echo "$response" | jq -r '.message')

# Validate the result
if [[ "$actual_value" == "$expected_result" ]]; then
    echo "PASS"
    exit 0
else
    echo "FAIL expected:" $expected_result "received:"  $actual_value
    exit 1
fi
