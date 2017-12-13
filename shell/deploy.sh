#!/bin/bash
USERNAME=root
HOSTS="server.smallrobot.org"
SCRIPT="cd /home/smallrobot.co/public_html; git pull;"

for HOSTNAME in ${HOSTS} ; do
    ssh -l ${USERNAME} ${HOSTNAME} "${SCRIPT}"
done
