import DynamoDB, { DocumentClient } from "aws-sdk/clients/dynamodb";

const dynamoDb = new DocumentClient();

export const createEntry = async (data: Object) => {
  if (!process.env.TABLE_NAME) {
    console.log("Missing table name");
    throw new Error("No table name supplied");
  }
  var params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.TABLE_NAME,
    Item: data,
    ReturnValues: "ALL_OLD",
  };

  await dynamoDb.put(params).promise();

  return await dynamoDb
    .get({
      TableName: process.env.TABLE_NAME,
      Key: { customerId: data.customerId },
    })
    .promise();
};

export const getEntries = async () => {
  if (!process.env.TABLE_NAME) {
    console.log("Missing table name");
    throw new Error("No table name supplied");
  }

  return await dynamoDb
    .scan({
      TableName: process.env.TABLE_NAME,
    })
    .promise();
};

export const getEntry = async (customerId: string) => {
  if (!process.env.TABLE_NAME) {
    console.log("Missing table name");
    throw new Error("No table name supplied");
  }

  return await dynamoDb
    .get({
      TableName: process.env.TABLE_NAME,
      Key: { customerId },
    })
    .promise();
};

export const deleteEntry = async (customerId: string) => {
  if (!process.env.TABLE_NAME) {
    console.log("Missing table name");
    throw new Error("No table name supplied");
  }

  return await dynamoDb
    .delete({
      TableName: process.env.TABLE_NAME,
      Key: { customerId },
    })
    .promise();
};
