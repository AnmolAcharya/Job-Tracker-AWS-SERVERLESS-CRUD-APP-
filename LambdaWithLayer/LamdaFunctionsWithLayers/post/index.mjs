import { docClient, PutCommand, createResponse } from '/opt/nodejs/utils.mjs'; // Import from Layer

const tableName = process.env.tableName || "JobTrackerTable";

export const createJob = async (event) => {
    const { body } = event;
    const { jobId, Name, AppliedDate, Status, Referall } = JSON.parse(body || "{}");


    console.log("values", jobId, Name, AppliedDate, Status, Referall);

    if (!jobId || !Name || !AppliedDate || !Status || Referall === undefined) {
        return createResponse(409, { error: "Missing required attributes for the item: jobId, name, appliedDate, status, or referall." });
    }

    const command = new PutCommand({
        TableName: tableName,
        Item: {
            jobId,
            Name,
            AppliedDate,
            Status,
            Referall
        },
        ConditionExpression: "attribute_not_exists(JobId)",
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