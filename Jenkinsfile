pipeline {
    agent any

    stages {
        stage('Deploy') {
            when {
                branch 'deploys'
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
