#!/bin/bash

STACK_NAME=sam-workshop-dev-stage
DEV_ENDPOINT=$(aws cloudformation describe-stacks --stack-name $STACK_NAME  | jq -r '.Stacks[].Outputs[].OutputValue | select(startswith("https://"))')

watch -n 1 "curl -s $DEV_ENDPOINT | jq '.deployment' 2>&1 | tee -a outputs.txt" 

# later calc the ratio 
# sort outputs.txt  | uniq -c
