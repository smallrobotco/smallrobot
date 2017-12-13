pipeline {
  agent any
  stages {
    stage('Production Deploy') {
      agent any
      steps {
        sh 'ssh root@server.smallrobot.org'
        sh 'cd /home/smallrobot.co/public_html; git pull;'
      }
    }
  }
}