#!/bin/bash

ssh -i "PECdev.pem" ubuntu@ec2-52-42-46-135.us-west-2.compute.amazonaws.com "cd /var/www/html/purdue-electronic-checkout && sudo git pull origin master"