import { APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
const SQS = new AWS.SQS({ region: 'ap-northeast-1' });
const QueueUrl = process.env.QUEUE_URL || '';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    const sendMessage = await SQS.sendMessage({ MessageBody: JSON.stringify(event.body), QueueUrl }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(sendMessage)
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 502, body: JSON.stringify({ message: error }) };
  }
}