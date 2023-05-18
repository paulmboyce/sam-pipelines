import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
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

const generateResponse = (statusCode: number, body: object): APIGatewayProxyResult => {
    return {
        statusCode,
        body: JSON.stringify(body),
    };
};

export const __test__ = {
    generateResponse: generateResponse,
};
