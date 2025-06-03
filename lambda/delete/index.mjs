import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.tableName || "JobTrackerTable";

const createResponse = (statusCode, body) => {
    const responseBody = JSON.stringify(body);
    return {
        statusCode,
        headers: { "Content-Type": "application/json" },
        body: responseBody,
    };
};

export const deleteJob = async (event) => {
    const { pathParameters } = event;
    const jobId = pathParameters?.id;
    if (!jobId)
        return createResponse(400, { error: "Missing jobId" });

    try {
        const command = new DeleteCommand({
            TableName: tableName,
            Key: {
                jobId,
            },
            ReturnValues: "ALL_OLD", // returns deleted value as response
            ConditionExpression: "attribute_exists(jobId)", // ensures the item exists before deleting
        });

        const response = await docClient.send(command);
        return createResponse(200, { message: "Item Deleted Successfully!", response });
    }
    catch (err) {
        if (err.message === "The conditional request failed")
            return createResponse(404, { error: "Item does not exists!" });
        return createResponse(500, {
            error: "Internal Server Error!",
            message: err.message,
        });
    }
}