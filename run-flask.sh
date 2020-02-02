#!/bin/bash

set -e

source .env

docker run -it --rm \
     -e TWILIO_ACCOUNT_SID=$TWILIO_ACCOUNT_SID \
     -e TWILIO_ACCOUNT_TOKEN=$TWILIO_ACCOUNT_TOKEN \
     -e TWILIO_PHONE_NUMBER=$TWILIO_PHONE_NUMBER \
     -p 5000:5000 \
     sms-tool:latest
