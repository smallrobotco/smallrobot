pipeline {
    agent any

    stages {
        stage('Deploy') {
            when {
                branch 'deploys'
            }
            steps {
                sh 'ssh root@smallrobot.co > ./deploy.sh'
                sh 'logout'
            }
        }
    }
}
