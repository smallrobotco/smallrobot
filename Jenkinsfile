pipeline {
  agent any
  stages {
    stage('Dev Deploy') {
      when {
        branch 'dev'
      }
      agent any
      steps {
        sh 'shell/./deploy.sh'
      }
    }
    stage('Production Deploy') {
      when {
        branch 'master'
      }
      agent any
      steps {
        sh 'shell/./deploy.sh'
      }
    }
  }
}
