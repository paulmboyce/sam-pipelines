import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const dynamoDB = new DynamoDBClient({ region: process.env.AWS_REGION });

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;

    //throw new Error('This will cause a deployment rollback');

    try {
        const messageId = uuidv4();
        const currentDate = new Date();
        const messageItem = {
            messageId: { S: messageId },
            message: { S: 'HelloWorldFunction executed in ' + process.env.AWS_REGION },
            timestamp: { S: currentDate.toISOString() },
        };

        const params = {
            TableName: 'message-table',
            Item: messageItem,
        };

        await dynamoDB.send(new PutItemCommand(params));

        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello paul',
                deployment: 'canary: Canary10Percent5Minutes',
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
