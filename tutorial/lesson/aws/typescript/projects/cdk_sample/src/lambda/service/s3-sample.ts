import type { S3 } from 'aws-sdk';
import { Callback } from 'aws-lambda';
interface Payload {
  s3: S3
  key: string
  bucket: string
  callback: Callback
}
export const getS3Object: (o: Payload) => Promise<string> = async ({ s3, bucket, key, callback }) => {
  const params = {
    Bucket: bucket,
    Key: key
  };
  const ret = await s3.getObject(params).promise();
  if (!ret.Body) throw Error(`s3 object is empty. Bucket: ${bucket}, Key: ${key}`)
  const message = ret.Body.toString();
  console.log(message);
  callback(null, `access ${key}`)
  return message;
}