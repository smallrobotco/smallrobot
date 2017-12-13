pipeline {
  agent any
  stages {
    stage('Production Deploy') {
      when {
        branch 'deploys'
      }
      agent any
      steps {
        sh 'shell/./deploy.sh'
      }
    }
  }
}
