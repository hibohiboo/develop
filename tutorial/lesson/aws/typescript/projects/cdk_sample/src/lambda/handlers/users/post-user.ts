import { APIGatewayProxyHandler } from 'aws-lambda';
import * as response from '@/lambda/utilities/reponse';
import * as users from '../../users/persistant/users';

export const lambdaHandler: APIGatewayProxyHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const { body } = event;
  if (!body) {
    return response.badRequest('body is required')
  }
  try {
    const user = await users.create(JSON.parse(body))
    return response.ok(user);
  } catch (e) {
    console.error(e)
    throw e
  }
};