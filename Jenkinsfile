pipeline {
  agent any
  stages {
    stage('Deploy') {
      agent any
      steps {
        sh 'shell/./deploy.sh'
        emailext(subject: 'Deployed', body: 'Small Robot Prod Deployed', attachLog: true, from: 'trent@smallrobot.co', to: 'trent@smallrobot.co', replyTo: 'noreply@smallrobot.co')
      }
    }
  }
}