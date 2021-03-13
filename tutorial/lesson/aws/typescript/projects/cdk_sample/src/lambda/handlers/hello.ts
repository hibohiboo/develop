import { Handler } from 'aws-lambda';
export const lambdaHandler: Handler = async (event, context) => {
  let response = null;
  try {
    response = {
      'statusCode': 200,
      'body': JSON.stringify({
        message: 'hello world',
      })
    }
  } catch (err) {
    console.log(err);
    return err;
  }

  return response
};
