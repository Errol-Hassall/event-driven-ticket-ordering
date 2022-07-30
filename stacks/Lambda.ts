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
      consumer: "functions/updateAvailability.handler",
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
          sendReceipt: "functions/sendReceipt.handler",
        },
      },
    },
  });

  bus.attachPermissions(["dynamodb"]);

  const lambda = new Api(stack, "api", {
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
      "GET /": "functions/helloWorld.handler",
      "GET /list-tickets": "functions/listTickets.handler",
      "POST /order-tickets": "functions/orderTickets.handler",
      "POST /process": "functions/processOrder.handler",
    },
  });

  lambda.attachPermissions([bus, "dynamodb"]);

  stack.addOutputs({
    ApiEndpoint: lambda.url,
  });

  return {
    table,
    lambda,
  };
}
