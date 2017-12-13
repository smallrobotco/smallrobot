pipeline {
  agent any
  stages {
    stage('Production Deploy') {
      agent any
      environment {
        USERNAME = 'smallrobot.co'
        HOST = 'server.smallrobot.org'
      }
      steps {
        sh 'ssh {environment:USERNAME}@{environment:HOST}'
        sh 'shell/./deploy.sh'
      }
    }
  }
}