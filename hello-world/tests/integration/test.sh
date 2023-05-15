#!/bin/bash

STACK_NAME=sam-workshop-dev-stage

DEV_ENDPOINT=$(aws cloudformation describe-stacks --stack-name $STACK_NAME  | jq -r '.Stacks[].Outputs[].OutputValue | select(startswith("https://"))')

echo "Dev endpoint: $DEV_ENDPOINT"
curl -s $DEV_ENDPOINT


RESULT=$(curl -H "Accept: application/json"  $DEV_ENDPOINT | jq '.message' )

EXPECT_CONTAINS=*"hello paul"*

if [[ $RESULT = $EXPECT_CONTAINS ]]; then
    echo "test PASS"    
    exit 0
  else     
    echo "test FAIL: expected $EXPECT_CONTAINS"    
    exit 1
  fi