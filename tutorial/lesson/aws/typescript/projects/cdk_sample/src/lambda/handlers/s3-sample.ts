import { S3 } from 'aws-sdk';
import { Handler } from 'aws-lambda';
// localstack
const config = {
  endpoint: (process.env.IS_LOCAL_STACK === "true" ? "http://localstack:4566" : undefined),
  s3ForcePathStyle: process.env.IS_LOCAL_STACK === "true",
}
const s3 = new S3(config);
const { S3_BUCKET } = process.env;
if (!S3_BUCKET) throw Error('env S3_BUCKET is empy')

export const lambdaHandler: Handler = async (event, context, callback) => {
  try {
    const params = {
      Bucket: S3_BUCKET,
      Key: event.Key
    };
    const ret = await s3.getObject(params).promise();
    if (!ret.Body) throw Error(`s3 object is empty. Bucket: ${S3_BUCKET}, Key: ${event.Key}`)
    const message = ret.Body.toString();
    console.log(message);
    callback(null, `access ${event.Key}`)
  } catch (err) {
    console.log(err);
    return err;
  }
};