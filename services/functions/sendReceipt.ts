import middy from "@middy/core";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

const _sendReceipt = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log("RECEIPT SENT", event);

  return {
    statusCode: 202,
    body: JSON.stringify({
      completed: true,
    }),
  };
};

export const handler = middy().handler(_sendReceipt);
