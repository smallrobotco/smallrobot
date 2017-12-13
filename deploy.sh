#!/bin/zsh
USERNAME=root
HOSTS="smallrobot.co"
SCRIPT="
su smallrobot.co;
cd ~/public_html;
git pull;
exit;
logout;
"

for HOSTNAME in ${HOSTS} ; do
    ssh -l ${USERNAME} ${HOSTNAME} "${SCRIPT}"
done
