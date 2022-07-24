import middy from "@middy/core";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import AWS from "aws-sdk";
import { createEntry } from "../database/database";
const DynamoDb = new AWS.DynamoDB.DocumentClient();

const _processOrder = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log("PROCESSED ORDER", event);

  const entry = { customerId: event.id, order: event.detail };

  console.log(await createEntry(entry));

  return {
    statusCode: 202,
    body: JSON.stringify({
      completed: true,
      // customerId: entry.customerId,
    }),
  };
};

export const handler = middy().handler(_processOrder);
