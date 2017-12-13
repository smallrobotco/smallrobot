#!/bin/bash
USERNAME=smallrobot.co
HOSTS="server.smallrobot.org"
SCRIPT="cd ~; cd public_html; git pull;"

for HOSTNAME in ${HOSTS} ; do
    ssh -l ${USERNAME} ${HOSTNAME} "${SCRIPT}"
done
