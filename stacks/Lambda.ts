import {
  StackContext,
  Api,
  EventBus,
  Table,
  Function,
} from "@serverless-stack/resources";
import { EVENT_DETAIL_TYPE, EVENT_SOURCE } from "../services/types/events";

export function Lambda({ stack }: StackContext) {
  const table = new Table(stack, "Orders", {
    fields: {
      customerId: "string",
    },
    primaryIndex: { partitionKey: "customerId" },
    stream: true,
    consumers: {
      consumer: "functions/database/updateAvailability.handler",
    },
  });

  new Function(stack, "databaseFunction", {
    handler: "functions/processOrder.handler",
    environment: {
      TABLE_NAME: table.tableName,
    },
    permissions: [table, "dynamodb"],
  });

  const bus = new EventBus(stack, "order", {
    defaults: {
      function: {
        timeout: 20,
        environment: { TABLE_NAME: table.tableName },
        permissions: [table],
      },
    },
    rules: {
      order: {
        pattern: {
          source: [EVENT_SOURCE.order],
          detailType: [EVENT_DETAIL_TYPE.order],
        },
        targets: {
          processOrder: "functions/processOrder.handler",
          sendReceipt: "functions/database/sendReceipt.handler",
        },
      },
    },
  });

  bus.attachPermissions(["dynamodb"]);

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        permissions: [table],
        environment: {
          busName: bus.eventBusName,
          TABLE_NAME: table.tableName,
        },
      },
    },
    routes: {
      "GET /list-tickets": "functions/api/listTickets.handler",
      "POST /order-tickets": "functions/api/orderTickets/orderTickets.handler",
    },
  });

  api.attachPermissions([bus, "dynamodb"]);

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    table,
    api,
  };
}
