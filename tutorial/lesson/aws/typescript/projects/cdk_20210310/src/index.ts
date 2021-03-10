exports.handler = async (event) => {
  // TODO implement
  const a: string = 'Hello from Lambda! TS!!!!'
  const response = {
    statusCode: 200,
    body: JSON.stringify(a),
  };
  return response;
};