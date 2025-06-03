import { stat } from 'fs';
import { docClient, UpdateCommand, createResponse } from '/opt/nodejs/utils.mjs'; // Import from Layer

const tableName = process.env.tableName || "JobTrackerTable";

export const updateJob = async (event) => {
    const { pathParameters, body } = event;

    const jobId = pathParameters?.id;
    if (!jobId)
        return createResponse(400, { error: "Missing jobId" });

    const { Name, AppliedDate, Status, Referall } = JSON.parse(body || "{}");
    if (!Name && !AppliedDate && !Status && Referall === undefined)
        return createResponse(400, { error: "Nothing to update!" })

    let updateExpression = `SET  ${Name ? "#Name = :Name, " : ""}${AppliedDate ? "AppliedDate = :AppliedDate, " : ""}${Status ? "#Status = :Status, " : ""}${Referall ? "Referall = :Referall, " : ""}`.slice(0, -2); //modify the referall part if any issues persist

    try {

        const command = new UpdateCommand({
            TableName: tableName,
            Key: {
                jobId,
            },
            UpdateExpression: updateExpression,
            ...(Name && {
                ExpressionAttributeNames: {
                    "#Name": "Name", // name is a reserved keyword in DynamoDB
                    "#Status": "Status",
                },
            }),
            ExpressionAttributeValues: {
                ...(Name && { ":Name": Name }),
                ...(AppliedDate && { ":AppliedDate": AppliedDate }),
                ...(Status && { ":Status": Status }),
                ...(Referall && { ":Referall": Referall }),
            },
            ReturnValues: "ALL_NEW", // returns updated value as response
            ConditionExpression: "attribute_exists(jobId)", // ensures the item exists before updating
        });

        const response = await docClient.send(command);
        console.log(response);
        return response; //check if we need the api gateway format for it >>>>

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