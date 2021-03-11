import { APIGatewayProxyHandler } from 'aws-lambda';
import * as dateUtility from '@/lambda/utilities/dateUtility';
const handler: APIGatewayProxyHandler = async (event) => {
  // TODO implement
  const test: string = `Hello from Lambda! TS!${dateUtility.formatISO(new Date())}`
  const response = {
    statusCode: 200,
    body: JSON.stringify(test),
  };
  return response;
};

exports.handler = handler