import { APIGatewayProxyHandler } from 'aws-lambda';
import * as dateUtility from '@/lambda/utilities/dateUtility';

export const handler: APIGatewayProxyHandler = async (event) => {
  // TODO implement
  const test: string = `Hello from Lambda! TS!${dateUtility.formatISO(new Date())}, key: ${process.env.API_KEY}`
  const response = {
    statusCode: 200,
    body: JSON.stringify(test),
  };
  return response;
};

// exports.handler = handler