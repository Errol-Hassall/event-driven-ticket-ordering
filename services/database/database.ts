import AWS, { DynamoDB } from "aws-sdk";
import { PutItemInputAttributeMap } from "aws-sdk/clients/dynamodb";

const dynamoDb = new DynamoDB.DocumentClient();

export const createEntry = async (data: PutItemInputAttributeMap) => {
  if (!process.env.TABLE_NAME) {
    console.log("Missing table name");
    throw new Error("No table name supplied");
  }
  var params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.TABLE_NAME,
    Item: data,
  };

  // Call DynamoDB to add the item to the table
  return await dynamoDb.put(params).promise();
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
