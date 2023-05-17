#!/bin/bash

STACK_NAME=sam-workshop-prod-stage
PROD_ENDPOINT=$(aws cloudformation describe-stacks --region us-east-1 --stack-name $STACK_NAME  | jq -r '.Stacks[].Outputs[].OutputValue | select(startswith("https://"))')

# 2 hits per second
watch -n 0.5 "curl -s $PROD_ENDPOINT | jq '.deployment' 2>&1 | tee -a prod-outputs.txt" 

# later calc the ratio 
# sort prod-outputs.txt  | uniq -c
