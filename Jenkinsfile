pipeline {
  agent any
  stages {
    stage('Deploy') {
      agent any
      steps {
        sh '/shell/./deploy.sh'
      }
    }
  }
}