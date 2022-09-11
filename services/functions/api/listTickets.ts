import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { getEntries } from "database/database";

type EventHandler = {
  body: null;
};

const _listTickets = async (
  event: EventHandler
): Promise<APIGatewayProxyResult> => {
  console.log("LIST ORDERS", event);

  const result = await getEntries();

  return {
    statusCode: 202,
    body: JSON.stringify({
      completed: true,
      items: result.Items,
      count: result.Items?.length,
    }),
  };
};

export const handler = middy()
  .use(jsonBodyParser())
  .use(httpErrorHandler())
  .handler(_listTickets);
