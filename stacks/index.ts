import { Lambda } from "./Lambda";
import { App } from "@serverless-stack/resources";
import { FrontendStack } from "./FrontendStack";
import { StorageStack } from "./StorageStack";
import RemixStack from "./RemixStack";

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app.stack(Lambda).stack(StorageStack).stack(FrontendStack);
}
