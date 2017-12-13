pipeline {
    // agent {
    //     docker {
    //         image 'node:6-alpine'
    //         args '-p 3000:3000 -p 5000:5000'
    //     }
    // }
    environment {
        CI = 'true'
    }
    stages {
        stage('Deploy for production') {
            when {
                branch 'production'
            }
            steps {
                sh 'ssh smallrobot.co@smallrobot.co'
                sh 'cd ~/public_html'
                sh 'git pull'
                sh 'logout'
            }
        }
    }
}
