import middy from "@middy/core";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { getEntries } from "database/database";

const _listTickets = async (
  event: APIGatewayEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  console.log("LIST ORDERS", event);

  const result = await getEntries();
  console.log({ result: result.Items });
  return {
    statusCode: 202,
    body: JSON.stringify({
      completed: true,
      items: result.Items,
    }),
  };
};

export const handler = middy().handler(_listTickets);
