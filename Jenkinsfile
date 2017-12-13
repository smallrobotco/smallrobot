pipeline {
  agent any
  stages {
    stage('Deploy') {
      agent any
      steps {
        sh 'ssh root@server.smallrobot.org'
        sh ' su smallrobot.co; cd ~/public_html; git pull; exit; logout;'
      }
    }
  }
}