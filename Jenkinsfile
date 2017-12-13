pipeline {
  agent any
  stages {
    stage('Production Deploy') {
      agent any
      environment {
        USER_NAME = 'smallrobot.co'
        DEPLOY_HOST = 'server.smallrobot.org'
      }
      steps {
        sh 'shell/./deploy.sh'
      }
    }
  }
}