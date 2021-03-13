
import * as app from '@/lambda/handlers/users/get-user';

jest.mock('@/lambda/users/persistant/users', () => ({
  findByName: jest.fn((username: string) => {
    return Promise.resolve({ username })
  })
}))

describe('Get User', function () {
  it('verifies successful response', async () => {
    const result = await app.lambdaHandler({ pathParameters: { username: 'test' } } as any, {} as any, () => { })
    if (!result) {
      throw new Error('failed');
    }
    expect(result.statusCode).toEqual(200);
    const response = JSON.parse(result.body);
    expect(response.username).toEqual("test");
  });
});


