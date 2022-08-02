export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        cors: {
          origin: '*',
          headers: [
            'Content-Type',
            'X-Amz-Date',
            'X-Api-Key',
            'X-Amz-Security-Token',
            'X-Amz-User-Agent',
            'authorization'
          ]
        },
        path: 'operate',
        request:{
          parameters: {
            querystrings: {
              clientId: true
            }
          }
        }
      }
    }
  ]
}
