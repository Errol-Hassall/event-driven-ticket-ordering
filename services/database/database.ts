import AWS, { DynamoDB } from "aws-sdk";
import { DB_TABLE_NAME } from "../types/constants/constants";

const dynamoDb = new DynamoDB.DocumentClient();

export const createEntry = async (data) => {
  var params = {
    TableName: "Orders",
    Item: data,
  };

  // Call DynamoDB to add the item to the table
  return await dynamoDb.put(params).promise();
};

export const getEntries = async () => {
  return await dynamoDb
    .scan({
      TableName: "Orders",
    })
    .promise();
};

export const getEntry = async (customerId: string) => {
  return await dynamoDb
    .get({
      TableName: "Orders",
      Key: { customerId },
    })
    .promise();
};

export const deleteEntry = async (customerId: string) => {
  return await dynamoDb
    .delete({
      TableName: "Orders",
      Key: { customerId },
    })
    .promise();
};
