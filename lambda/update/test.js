const data = {
    name: "test",
    appliedDate: "2020-05-01",
    status: "pending",
    // referall: "True",
};

const { name, appliedDate, status, referall } = data;

let updateParts = [];
let ExpressionAttributeValues = {};
let ExpressionAttributeNames = {};

// Build each part
if (name) {
    updateParts.push("#name = :name");
    ExpressionAttributeValues[":name"] = name;
    ExpressionAttributeNames["#name"] = "name";
}

if (appliedDate) {
    updateParts.push("appliedDate = :appliedDate");
    ExpressionAttributeValues[":appliedDate"] = appliedDate;
}

if (status) {
    updateParts.push("status = :status");
    ExpressionAttributeValues[":status"] = status;
}

if (referall) {
    updateParts.push("referall = :referall");
    ExpressionAttributeValues[":referall"] = referall;
}

// Join into a full UpdateExpression
const updateExpression = "SET " + updateParts.join(", ");

console.log("updateExpression:", updateExpression);
console.log("ExpressionAttributeValues:", ExpressionAttributeValues);
console.log("ExpressionAttributeNames:", ExpressionAttributeNames);



// const data = {
//     name: "test",
//     appliedDate: "2020-05-01",
//     status: "pending",
//     referall: "True",
// }

// const {name, appliedDate, status, referall} = data
// let updateExpression = 

// console.log("updateExpression", updateExpression);