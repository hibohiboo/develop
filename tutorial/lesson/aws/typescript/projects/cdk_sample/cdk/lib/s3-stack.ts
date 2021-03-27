import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
import { Stack } from '@aws-cdk/core';
import type { Construct, StackProps } from '@aws-cdk/core';

export class S3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const bucket = new Bucket(this, 'my-bucket', {
      versioned: true,
      bucketName: 'my-sample-bucket'
    });
  }
}
