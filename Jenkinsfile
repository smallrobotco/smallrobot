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
        sh 'ssh $USER_NAME@$DEPLOY_HOST'
        sh 'shell/./deploy.sh'
      }
    }
  }
}