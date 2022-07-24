import { createRequire as topLevelCreateRequire } from 'module'
const require = topLevelCreateRequire(import.meta.url)
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// stacks/Lambda.ts
import {
  Api,
  EventBus,
  Table,
  Function
} from "@serverless-stack/resources";
function Lambda({ stack }) {
  const table = new Table(stack, "Orders", {
    fields: {
      customerId: "string"
    },
    primaryIndex: { partitionKey: "customerId" },
    stream: true,
    consumers: {
      consumer: "functions/updateAvailability.handler"
    }
  });
  console.log("TABLE NAME", table.tableName);
  new Function(stack, "databaseFunction", {
    handler: "functions/processOrder.handler",
    environment: {
      TABLE_NAME: table.tableName
    },
    permissions: [table, "dynamodb"]
  });
  const bus = new EventBus(stack, "order", {
    rules: {
      order: {
        pattern: {
          source: ["event-driven-ticket-ordering.order" /* order */],
          detailType: ["Order" /* order */]
        },
        targets: {
          processOrder: "functions/processOrder.handler",
          sendReceipt: "functions/sendReceipt.handler"
        }
      }
    }
  });
  bus.attachPermissions(["dynamodb"]);
  const lambda = new Api(stack, "api", {
    defaults: {
      function: {
        permissions: [table],
        environment: {
          busName: bus.eventBusName,
          tableName: table.tableName
        }
      }
    },
    routes: {
      "GET /": "functions/helloWorld.handler",
      "POST /order-tickets": "functions/orderTickets.handler",
      "POST /process": "functions/processOrder.handler"
    }
  });
  lambda.attachPermissions([bus, "dynamodb"]);
  stack.addOutputs({
    ApiEndpoint: lambda.url
  });
}
__name(Lambda, "Lambda");

// stacks/index.ts
function stacks_default(app) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm"
    }
  });
  app.stack(Lambda);
}
__name(stacks_default, "default");
export {
  stacks_default as default
};
//# sourceMappingURL=index.js.map
