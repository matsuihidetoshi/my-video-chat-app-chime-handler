import 'source-map-support/register'
const { Chime }: any = require("aws-sdk")

const chime: any = new Chime({
  region: 'us-east-1',
  endpoint: 'service.chime.aws.amazon.com',
  access_key_id: process.env.ACCESS_KEY_ID,
  secret_access_key: process.env.SECRET_ACCESS_KEY
})
const { v4: uuidv4 }: any = require("uuid")

const json: any = (statusCode: any, contentType: any, body: any) => {
  return {
      statusCode,
      headers: {
        "content-type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true"
      },
      body: JSON.stringify(body)
  }
}

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway'
import { middyfy } from '@libs/lambda'

import schema from './schema'

const operate: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const query: any = event.queryStringParameters
  let meetingId: string
  let meeting: any

  if (!query.meetingId) {
    meetingId = uuidv4()
    meeting = await chime
      .createMeeting({
          ClientRequestToken: meetingId,
          MediaRegion: "ap-northeast-1",
          ExternalMeetingId: meetingId,
      })
      .promise()
  } else {
    meetingId = query.meetingId;
    meeting = await chime
      .getMeeting({
          MeetingId: meetingId,
      })
      .promise()
  }

  const attendee: any = await chime
    .createAttendee({
        MeetingId: meeting.Meeting.MeetingId,
        ExternalUserId: `${uuidv4().substring(0, 8)}#${query.clientId}`,
    })
    .promise()
  
  return json(200, "application/json", {
    Info: {
      Meeting: meeting,
      Attendee: attendee,
    },
  })
}

export const main = middyfy(operate);
