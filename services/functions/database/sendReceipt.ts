import middy from "@middy/core";
import { sendEmail } from "../../email/email";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

const _sendReceipt = async (
  event: APIGatewayEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  const eventDetail = event?.detail.orderDetails.data.Item;

  await sendEmail({
    email: eventDetail.email,
    tickets: eventDetail.order,
  });

  return {
    statusCode: 202,
    body: JSON.stringify({
      completed: true,
    }),
  };
};

export const handler = middy().handler(_sendReceipt);
