import { S3 } from 'aws-sdk';
import { Handler } from 'aws-lambda';
import { getS3Object } from '../service/s3-sample';

const s3 = new S3();
const { S3_BUCKET } = process.env;
if (!S3_BUCKET) throw Error('env S3_BUCKET is empy')

export const lambdaHandler: Handler = async (event, context, callback) => {
  try {
    const message = getS3Object({ s3, key: event.Key, bucket: S3_BUCKET, callback });
    console.log(message)
  } catch (err) {
    console.log(err);
    return err;
  }
};