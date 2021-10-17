#!/bin/bash

aws secretsmanager get-secret-value --secret-id ec2-ssh-key/cdk-keypair/private --query SecretString --output text --profile=produser > cdk-key.pem 
