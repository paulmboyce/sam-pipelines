import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;
    try {
        const messageId = uuidv4();
        const currentDate = new Date();
        const messageItem = {
            messageId: messageId,
            message: 'HelloWorldFunction executed',
            timestamp: currentDate.toISOString(),
        };

        const params = {
            TableName: 'message-table',
            Item: messageItem,
        };

        await dynamoDB.put(params).promise();

        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello paul',
            }),
        };
    } catch (err) {
        console.error(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened',
            }),
        };
    }
    return response;
};
