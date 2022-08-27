import { StackContext, Api, use } from "@serverless-stack/resources";
import { DatabaseStack } from "./DatabaseStack";
import { RouterStack } from "./RouterStack";

export function LambdaStack({ stack }: StackContext) {
  const { table } = use(DatabaseStack);
  const { bus } = use(RouterStack);

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
    api,
  };
}
