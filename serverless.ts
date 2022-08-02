import type { AWS } from '@serverless/typescript';

import { operate } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'my-video-chat-app-chime-handler',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    region: 'ap-northeast-1',
    stage: 'beta',
    iam: {
      role: {
        statements: [
          {
            'Effect': 'Allow',
            'Action': [
              'chime:*'
            ],
            'Resource': '*'
          }
        ]
      }
    }
  },
  functions: { operate }
}

module.exports = serverlessConfiguration;
