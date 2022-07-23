export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
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
