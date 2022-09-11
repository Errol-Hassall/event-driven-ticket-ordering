import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { APIGatewayProxyResult } from "aws-lambda";
import { takeOrderEvent } from "../../../types/events";
import { sendToRouter } from "../../../router/router";
import { OrderTickets } from "../../../types/types";
import validator from "@middy/validator";
import httpErrorHandler from "@middy/http-error-handler";
import { createEntry } from "database/database";
import { v4 as uuidv4 } from "uuid";

type EventHandler = {
  body: OrderTickets;
};

export const _orderTickets = async (
  event: EventHandler
): Promise<APIGatewayProxyResult> => {
  const tickets = event?.body?.tickets;
  const email = event?.body.email;

  try {
    const orderDetails = tickets;

    const entry = {
      customerId: uuidv4(),
      order: orderDetails,
      email,
    };

    const returnedItemFromDB = await createEntry(entry);

    const payload = takeOrderEvent({ data: returnedItemFromDB });

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
        email: {
          type: "string",
        },
        tickets: {
          type: "object",
          properties: {
            seats: { type: "array" },
          },
          required: ["seats"],
        },
      },
      required: ["tickets", "email"],
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
