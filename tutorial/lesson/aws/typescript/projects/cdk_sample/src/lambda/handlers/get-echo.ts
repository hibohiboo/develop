import { APIGatewayProxyHandler } from 'aws-lambda';
import * as response from '../utilities/reponse';

export const echoHandler: APIGatewayProxyHandler = async (event) => {
  const { httpMethod, path, pathParameters } = event;
  if (httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${httpMethod}`);
  }
  // All log statements are written to CloudWatch by default. For more information, see
  // https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-logging.html
  console.log('received:', JSON.stringify(event));

  // Get id from pathParameters from APIGateway because of `/{id}` at template.yml
  const params = pathParameters;
  if (!params || !params.id) {
    return response.badRequest('parameter is required')
  }
  const { id } = params;
  const res = response.ok(id);
  console.log(`response from: ${path} statusCode: ${res.statusCode} body: ${res.body}`);
  return res;
};