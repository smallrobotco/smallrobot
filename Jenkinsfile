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
        sh 'ssh USERNAME@HOST'
        sh 'shell/./deploy.sh'
      }
    }
  }
}