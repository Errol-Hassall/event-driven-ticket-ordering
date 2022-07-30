import AWS, { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

console.log(process.env.TABLE_NAME);

export const createEntry = async (data) => {
  if (!process.env.TABLE_NAME) {
    console.log("Missing table name");
  }
  var params = {
    TableName: process.env.TABLE_NAME,
    Item: data,
  };

  // Call DynamoDB to add the item to the table
  return await dynamoDb.put(params).promise();
};

export const getEntries = async () => {
  return await dynamoDb
    .scan({
      TableName: process.env.TABLE_NAME,
    })
    .promise();
};

export const getEntry = async (customerId: string) => {
  return await dynamoDb
    .get({
      TableName: process.env.TABLE_NAME,
      Key: { customerId },
    })
    .promise();
};

export const deleteEntry = async (customerId: string) => {
  return await dynamoDb
    .delete({
      TableName: process.env.TABLE_NAME,
      Key: { customerId },
    })
    .promise();
};
