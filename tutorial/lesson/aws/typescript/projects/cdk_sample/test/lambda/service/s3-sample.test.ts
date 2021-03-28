import * as fs from 'fs';
import * as path from 'path';
import { S3 } from 'aws-sdk';
import { getS3Object } from '@/lambda/service/s3-sample';
// localstack
const config = {
  endpoint: 'http://localhost:4566',
  s3ForcePathStyle: true,
};

const s3 = new S3(config);

/*
 * test suits
 */
describe('core/getS3Object test suit #1', () => {
  // shared variables over the test suit
  let bucket: string;
  let key: string;
  const callback = () => { }

  /*
   * starup
  */
  beforeEach(async () => {
    // generate test resource sequence code from timestamp
    const now = new Date().getTime();
    bucket = `test-bucket-${now}`;
    key = `message_${now}.txt`;
    // create bucket & bucket key
    await s3.createBucket({ Bucket: bucket }).promise();
    await s3.putObject({
      Bucket: bucket,
      Key: key,
      ContentType: 'text/plain',
      Body: fs.readFileSync(path.join(__dirname, '..', '..', 'fixture', 's3', 'message.txt')),
    }).promise();
  });

  /*
   * test cases
  */
  it('successfully get an object from S3 bucket', async () => {
    const message = await getS3Object({ s3, bucket, key, callback });
    expect(message).toBe('Hi, there.\n');
  });

  it('throw error if access to non-existent key', async () => {
    try {
      await getS3Object({ s3, bucket, key: 'non-existent', callback })
      fail()
    } catch (error) {
      expect(error.name).toBe('NoSuchKey');
      expect(error.message).toBe('The specified key does not exist.');
    }
  });

  it('throw error if access to non-existent bucket', async () => {
    try {
      await getS3Object({ s3, bucket: 'non-existent', key: 'non-existent', callback })
      fail()
    } catch (error) {
      expect(error.name).toBe('NoSuchBucket');
      expect(error.message).toBe('The specified bucket does not exist');
    }

  });

  /*
   * tear-down
   */
  afterEach(async () => {
    // delete bucket key & bucket
    await s3.deleteObject({
      Bucket: bucket,
      Key: key,
    }).promise();
    await s3.deleteBucket({ Bucket: bucket }).promise();
  });
});