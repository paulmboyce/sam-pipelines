import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const dynamoDB = new DynamoDBClient({ region: process.env.AWS_REGION });

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // const messageId = uuidv4();
        // const currentDate = new Date();
        // await updateDynamoDBTable(messageId, currentDate);

        const response = generateResponse(200, {
            message: 'hello paul',
        });

        return response;
    } catch (error) {
        console.error(error);

        const errorResponse = generateResponse(500, {
            message: error instanceof Error ? error.message : 'some error happened',
        });

        return errorResponse;
    }
};

const updateDynamoDBTable = async (messageId: string, currentDate: Date): Promise<void> => {
    try {
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
    } catch (error) {
        console.error('Error updating DynamoDB table:', error);
        throw error;
    }
};

const generateResponse = (statusCode: number, body: object): APIGatewayProxyResult => {
    return {
        statusCode,
        body: JSON.stringify(body),
    };
};
