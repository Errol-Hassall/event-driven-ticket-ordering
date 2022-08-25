import {
  ReactStaticSite,
  StackContext,
  use,
} from "@serverless-stack/resources";
import { Lambda } from "./Lambda";
import { StorageStack } from "./StorageStack";

export function FrontendStack({ stack, app }: StackContext) {
  const { api } = use(Lambda);
  // const { auth } = use(AuthStack);
  const { bucket } = use(StorageStack);
  console.log(api);

  // Define our React app
  const site = new ReactStaticSite(stack, "ReactSite", {
    path: "frontend",
    // Pass in our environment variables
    environment: {
      REACT_APP_API_URL: api.customDomainUrl || api.url,
      REACT_APP_REGION: app.region,
      REACT_APP_BUCKET: bucket.bucketName,
      // REACT_APP_USER_POOL_ID: auth.userPoolId,
      // REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId,
      // REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
    },
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.url,
  });
}