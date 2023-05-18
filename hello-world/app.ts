import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return generateResponse(200, {
        message: 'hello paul',
    });
};

const generateResponse = (statusCode: number, body: object): APIGatewayProxyResult => {
    return {
        statusCode,
        body: JSON.stringify(body),
    };
};

export const __test__ = {
    generateResponse: generateResponse,
};
