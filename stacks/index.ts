import { LambdaStack } from "./LambdaStack";
import { App } from "@serverless-stack/resources";
import { FrontendStack } from "./FrontendStack";
import { StorageStack } from "./StorageStack";
import RemixStack from "./RemixStack";
import { RouterStack } from "./RouterStack";
import { DatabaseStack } from "./DatabaseStack";

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app
    .stack(DatabaseStack)
    .stack(RouterStack)
    .stack(LambdaStack)
    .stack(StorageStack)
    .stack(FrontendStack)
    .stack(RemixStack);
}
