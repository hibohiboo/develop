import { SQSHandler } from 'aws-lambda';

export const handler: SQSHandler = async (event, context) => {
  try {
    for (const message of event.Records) {
      // キューの処理
      console.log(message);
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000); //適当な処理
      });
    }

  } catch (e) {
    throw e
  }
}