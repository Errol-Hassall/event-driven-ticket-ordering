import { StackContext, Table, Function } from "@serverless-stack/resources";

export function DatabaseStack({ stack }: StackContext) {
  const table = new Table(stack, "orders-table", {
    fields: {
      customerId: "string",
    },
    primaryIndex: { partitionKey: "customerId" },
    stream: true,
    consumers: {
      consumer: "functions/database/updateAvailability.handler",
    },
  });

  const processOrderFunction = new Function(stack, "process-order", {
    handler: "functions/processOrder.handler",
    environment: {
      TABLE_NAME: table.tableName,
    },
    permissions: [table, "dynamodb"],
  });

  return {
    table,
    processOrderFunction,
  };
}
