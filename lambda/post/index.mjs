//const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
// const { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

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

export const createJob = async (event) => {
    const { body } = event;
    const { jobId, name, appliedDate, status, referall } = JSON.parse(body || "{}");

    console.log("values", jobId, name, appliedDate, status, referall);


    if (!jobId || !name || !appliedDate || !status || referall === undefined) {
        return createResponse(409, { error: "Missing required attributes for the item: jobId, name, appliedDate, status, or referall." });
    }

    const command = new PutCommand({
        TableName: tableName,
        Item: {
            jobId,
            name,
            appliedDate,
            status,
            referall
        },
        ConditionExpression: "attribute_not_exists(coffeeId)",
    });

    try {
        const response = await docClient.send(command);
        return createResponse(201, { message: "Item Created Successfully!", response });
    }
    catch (err) {
        if (err.message === "The conditional request failed")
            return createResponse(409, { error: "Item already exists!" });
        else
            return createResponse(500, {
                error: "Internal Server Error!",
                message: err.message,
            });
    }

}

// module.exports = { createCoffee };

// const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
// const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

// const client = new DynamoDBClient({});
// const docClient = DynamoDBDocumentClient.from(client);

// const tableName = process.env.tableName || "JobTrackerTable";

// const createResponse = (statusCode, body) => {
//     const responseBody = JSON.stringify(body);
//     return {
//         statusCode,
//         headers: { "Content-Type": "application/json" },
//         body: responseBody,
//     };
// };

// const createJob = async (event) => {
//     const { body } = event;
//     const { jobId, name, appliedDate, status, referall } = JSON.parse(body || "{}");

//     console.log("values", jobId, name, appliedDate, status, referall);


//     if (!jobId || !name || !appliedDate || !status || referall === undefined) {
//         return createResponse(409, { error: "Missing required attributes for the item: jobId, name, appliedDate, status, or referall." });
//     }

//     const command = new PutCommand({
//         TableName: tableName,
//         Item: {
//             jobId,
//             name,
//             appliedDate,
//             status,
//             referall
//         },
//         ConditionExpression: "attribute_not_exists(coffeeId)",
//     });

//     try {
//         const response = await docClient.send(command);
//         return createResponse(201, { message: "Item Created Successfully!", response });
//     }
//     catch (err) {
//         if (err.message === "The conditional request failed")
//             return createResponse(409, { error: "Item already exists!" });
//         else
//             return createResponse(500, {
//                 error: "Internal Server Error!",
//                 message: err.message,
//             });
//     }

// }

// // module.exports = { createCoffee };
