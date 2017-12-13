pipeline {
  agent any
  stages {
    stage('Deploy') {
      agent any
      when {
        branch 'deploys'
      }
      steps {
        sh './deploy.sh'
      }
    }
  }
}