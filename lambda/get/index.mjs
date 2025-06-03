import { DynamoDBClient } from "@aws-sdk/client-dynamodb"; //#low lwvwl --> constructs our dynamodb client 
import { DynamoDBDocumentClient, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb"; //high level 

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

const getJob = async (event) => {
    const { pathParameters } = event;
    const { id } = pathParameters || {};

    try {
        let command;
        if (id) {
            command = new GetCommand({
                TableName: tableName,
                Key: {
                    "coffeeId": id,
                },
            });
        }
        else {
            command = new ScanCommand({
                TableName: tableName,
            });
        }
        const response = await docClient.send(command);
        return createResponse(200, response);
    }
    catch (err) {
        console.error("Error fetching data from DynamoDB:", err);
        return createResponse(500, { error: err.message });
    }

}

// module.exports = { getJob };

// export const getJob = async (event) => {
//   const command = new GetCommand({
//     TableName: "JobTrackerTable",
//     Key: {
//       jobId: "A121",
//     },
//   });

//   const response = await docClient.send(command);
//   console.log(response);
//   return response;
// };

