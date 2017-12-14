pipeline {
  agent any
  stages {
    stage('Dev Deploy') {
      agent any
      when {
        branch 'dev'
      }
      steps {
        sh 'npm i; ember deploy staging;'
      }
    }
    stage('Production Deploy') {
      agent any
      when {
        branch 'master'
      }
      steps {
        sh 'shell/./deploy.sh'
      }
    }
  }
}