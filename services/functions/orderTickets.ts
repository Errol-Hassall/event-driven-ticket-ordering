import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import { APIGatewayProxyResult, Context } from "aws-lambda";
import { takeOrderEvent } from "../types/events";
import { sendToRouter } from "../router/router";
import { TakeOrder } from "../types/types";

export const _orderTickets = async (
  event,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log("TAKEN ORDER");

  try {
    const orderDetails = event.body?.tickets as TakeOrder;

    const payload = takeOrderEvent(orderDetails);

    sendToRouter(payload);
    return { statusCode: 200, body: "published" };
  } catch (e) {
    console.error(e);
    return { statusCode: 400, body: "could not publish" };
  }
};

export const handler = middy().use(jsonBodyParser()).handler(_orderTickets);
