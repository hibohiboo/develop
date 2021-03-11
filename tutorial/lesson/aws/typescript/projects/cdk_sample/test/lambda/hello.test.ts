
import * as app from '@/lambda/handlers/hello'

describe('Tests index', function () {
  it('verifies successful response', async () => {
    const result = await app.lambdaHandler(null, {} as any, () => { })
    expect(result.statusCode).toEqual(200);
    let response = JSON.parse(result.body);
    expect(response.message).toEqual("hello world");
  });
});
