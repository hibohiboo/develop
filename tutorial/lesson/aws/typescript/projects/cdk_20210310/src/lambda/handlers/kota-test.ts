import { a } from '@/utility/test';

exports.handler = async (event) => {
  // TODO implement
  const test: string = `Hello from Lambda! TS!${a}`
  const response = {
    statusCode: 200,
    body: JSON.stringify(test),
  };
  return response;
};