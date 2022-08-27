import { StackContext, use, EventBus } from "@serverless-stack/resources";
import { EVENT_DETAIL_TYPE, EVENT_SOURCE } from "../services/types/events";
import { DatabaseStack } from "./DatabaseStack";

export function RouterStack({ stack }: StackContext) {
  const { table } = use(DatabaseStack);

  const bus = new EventBus(stack, "order-router", {
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

  return {
    bus,
  };
}
