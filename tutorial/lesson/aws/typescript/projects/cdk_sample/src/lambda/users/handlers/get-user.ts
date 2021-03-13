import { APIGatewayProxyHandler } from 'aws-lambda';
import * as response from '@/lambda/utilities/reponse';
import { findByName } from '@/lambda/users/persistant/users';

const getUsername = (params: { username?: string } | null) => {
  if (!params || !params.username) {
    return null
  }
  const { username } = params;
  return username;
}

export const lambdaHandler: APIGatewayProxyHandler = async (event) => {
  const username = getUsername(event.pathParameters);
  if (!username) {
    return response.badRequest('parameter is required');
  }
  try {
    const user = await findByName(username)
    return response.ok(user);
  } catch (e) {
    console.error(e)
    throw e
  }
};