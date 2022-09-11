import middy from "@middy/core";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { createEntry } from "../database/database";

const _processOrder = async (
  event: APIGatewayEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  console.log("PROCESSED ORDER", event);

  const entry = { customerId: event.id, order: event.detail };

  const result = await createEntry(entry);

  console.log({ result: result });

  return {
    statusCode: 202,
    body: JSON.stringify({
      completed: true,
      // customerId: entry.customerId,
    }),
  };
};

export const handler = middy().handler(_processOrder);
