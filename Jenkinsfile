pipeline {
  agent any
  stages {
    stage('Dev Deploy') {
      agent any
      when {
        branch 'dev'
      }
      steps {
        sh 'rm -rf node_modules dist tmp;
 npm install; bower install; ember deploy staging;'
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