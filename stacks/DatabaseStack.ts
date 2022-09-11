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

  return {
    table,
  };
}
