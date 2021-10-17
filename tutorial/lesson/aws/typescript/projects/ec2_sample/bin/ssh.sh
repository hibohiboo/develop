#!/bin/bash
ipaddress=${1}

ssh -i cdk-key.pem -o IdentitiesOnly=yes ec2-user@$ipaddress