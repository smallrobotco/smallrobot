pipeline {
  agent any
  stages {
    stage('Production Deploy') {
      agent any
      steps {
        sh 'shell/./deploy.sh'
      }
    }
  }
}