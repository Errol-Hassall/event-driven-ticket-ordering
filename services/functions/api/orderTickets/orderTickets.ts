import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { APIGatewayProxyResult } from "aws-lambda";
import { takeOrderEvent } from "../../../types/events";
import { sendToRouter } from "../../../router/router";
import { OrderTickets } from "../../../types/types";
import validator from "@middy/validator";
import httpErrorHandler from "@middy/http-error-handler";

type EventHandler = {
  body: OrderTickets;
};

export const _orderTickets = async (
  event: EventHandler
): Promise<APIGatewayProxyResult> => {
  const tickets = event?.body?.tickets;

  console.log("TAKEN ORDER", tickets);

  try {
    const orderDetails = tickets;

    const payload = takeOrderEvent(orderDetails);

    sendToRouter(payload);
    return { statusCode: 200, body: "published" };
  } catch (e) {
    console.error(e);
    return { statusCode: 400, body: "could not publish" };
  }
};

const inputSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        tickets: {
          type: "object",
          properties: {
            seats: { type: "array" },
          },
          required: ["seats"],
        },
      },
      required: ["tickets"],
    },
  },
};

export const handler = middy()
  .use(jsonBodyParser())
  .use(
    validator({
      inputSchema,
    })
  )
  .use(httpErrorHandler())
  .handler(_orderTickets);
