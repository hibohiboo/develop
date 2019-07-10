#!/bin/bash

sshpass -p docker ssh docker@localhost -p 10022 "DISPLAY=192.168.33.1:0.0 code /app"
