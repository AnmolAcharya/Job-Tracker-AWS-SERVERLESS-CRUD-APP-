import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.tableName || "JobTrackerTable";

const createResponse = (statusCode, body) => ({
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
});

export const updateJob = async (event) => {
    const { pathParameters, body } = event;
    const jobId = pathParameters?.id;

    if (!jobId) return createResponse(400, { error: "Missing jobId" });

    const parsedBody = JSON.parse(body || "{}");

    // Using UPPERCASED attribute keys to match what's in DynamoDB
    const Name = parsedBody.Name;
    const AppliedDate = parsedBody.AppliedDate;
    const Status = parsedBody.Status;
    const Referall = parsedBody.Referall;

    if (!Name && !AppliedDate && !Status && !Referall)
        return createResponse(400, { error: "Nothing to update!" });

    let updateParts = [];
    let ExpressionAttributeValues = {};
    let ExpressionAttributeNames = {};

    if (Name) {
        updateParts.push("#Name = :Name");
        ExpressionAttributeValues[":Name"] = Name;
        ExpressionAttributeNames["#Name"] = "Name";
    }

    if (AppliedDate) {
        updateParts.push("AppliedDate = :AppliedDate");
        ExpressionAttributeValues[":AppliedDate"] = AppliedDate;
    }

    if (Status) {
        updateParts.push("#Status = :Status");
        ExpressionAttributeValues[":Status"] = Status;
        ExpressionAttributeNames["#Status"] = "Status";
    }

    if (Referall) {
        updateParts.push("Referall = :Referall");
        ExpressionAttributeValues[":Referall"] = Referall;
    }

    const updateExpression = "SET " + updateParts.join(", ");

    try {
        const command = new UpdateCommand({
            TableName: tableName,
            Key: { jobId },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues,
            ...(Object.keys(ExpressionAttributeNames).length > 0 && { ExpressionAttributeNames }),
            ReturnValues: "ALL_NEW",
            ConditionExpression: "attribute_exists(jobId)",
        });

        const response = await docClient.send(command);
        return createResponse(200, {
            message: "Job updated successfully",
            updatedItem: response.Attributes,
        });

    } catch (err) {
        if (err.message.includes("ConditionalCheckFailed")) {
            return createResponse(404, { error: "Item does not exist!" });
        }

        return createResponse(500, {
            error: "Internal Server Error",
            message: err.message,
        });
    }
};


// import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// const client = new DynamoDBClient({});
// const docClient = DynamoDBDocumentClient.from(client);

// const tableName = process.env.tableName || "JobTrackerTable";

// const createResponse = (statusCode, body) => ({
//     statusCode,
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
// });

// export const updateJob = async (event) => {
//     const { pathParameters, body } = event;
//     const jobId = pathParameters?.id;

//     if (!jobId)
//         return createResponse(400, { error: "Missing jobId" });

//     const { name, appliedDate, status, referall } = JSON.parse(body || "{}");

//     if (!name && !appliedDate && !status && !referall)
//         return createResponse(400, { error: "Nothing to update!" });

//     let updateParts = [];
//     let ExpressionAttributeValues = {};
//     let ExpressionAttributeNames = {};

//     if (name) {
//         updateParts.push("#name = :name");
//         ExpressionAttributeValues[":name"] = name;
//         ExpressionAttributeNames["#name"] = "name"; // reserved word
//     }

//     if (appliedDate) {
//         updateParts.push("appliedDate = :appliedDate");
//         ExpressionAttributeValues[":appliedDate"] = appliedDate;
//     }

//     if (status) {
//         updateParts.push("status = :status");
//         ExpressionAttributeValues[":status"] = status;
//         ExpressionAttributeNames["#status"] = "status";
//     }

//     if (referall) {
//         updateParts.push("referall = :referall");
//         ExpressionAttributeValues[":referall"] = referall;
//     }

//     const updateExpression = "SET " + updateParts.join(", ");

//     try {
//         const command = new UpdateCommand({
//             TableName: tableName,
//             Key: { jobId },
//             UpdateExpression: updateExpression,
//             ExpressionAttributeValues,
//             ...(Object.keys(ExpressionAttributeNames).length > 0 && { ExpressionAttributeNames }),
//             ReturnValues: "ALL_NEW",
//             ConditionExpression: "attribute_exists(jobId)",
//         });

//         const response = await docClient.send(command);
//         return createResponse(200, {
//             message: "Job updated successfully",
//             updatedItem: response.Attributes,
//         });

//     } catch (err) {
//         if (err.message.includes("ConditionalCheckFailed")) {
//             return createResponse(404, { error: "Item does not exist!" });
//         }

//         return createResponse(500, {
//             error: "Internal Server Error",
//             message: err.message,
//         });
//     }
// };

