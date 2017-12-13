pipeline {
  agent any
  stages {
    stage('Production Deploy') {
      when {
        branch 'dev'
      }
      agent any
      steps {
        sh 'shell/./deploy.sh'
      }
    }
  }
}
