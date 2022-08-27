import {
  ReactStaticSite,
  StackContext,
  use,
} from "@serverless-stack/resources";
import { LambdaStack } from "./LambdaStack";
import { StorageStack } from "./StorageStack";

export function FrontendStack({ stack, app }: StackContext) {
  const { api } = use(LambdaStack);
  const { bucket } = use(StorageStack);

  // Define our React app
  const site = new ReactStaticSite(stack, "ReactSite", {
    path: "frontend",
    environment: {
      REACT_APP_API_URL: api.customDomainUrl || api.url,
      REACT_APP_REGION: app.region,
      REACT_APP_BUCKET: bucket.bucketName,
    },
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });
}
