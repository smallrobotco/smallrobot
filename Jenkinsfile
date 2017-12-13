pipeline {
  agent any
  stages {
    stage('Deploy') {
      agent any
      steps {
        sh 'ssh -l root@smallrobot.co "su smallrobot.co; cd ~/public_html; git pull; exit; logout;"'
      }
    }
  }
}
