import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as users from './models/users';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request. sql example');
    const responseMessage = await users.select();
    console.log('response', responseMessage)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;