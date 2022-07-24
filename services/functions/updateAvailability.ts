import middy from "@middy/core";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

const _processOrder = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log("UPDATE AVAILABILITY", event);

  return {
    statusCode: 202,
    body: JSON.stringify({
      completed: true,
    }),
  };
};

export const handler = middy().handler(_processOrder);
