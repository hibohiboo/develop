#!/bin/bash
ipaddress=${1}
scp -i cdk-key.pem -o IdentitiesOnly=yes ec2-user@$ipaddress:~/apache-jmeter-5.4/bin/report.zip ./
scp -i cdk-key.pem -o IdentitiesOnly=yes ec2-user@$ipaddress:~/apache-jmeter-5.4/bin/examples.zip ./
