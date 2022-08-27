import { RemixSite, StackContext, use } from "@serverless-stack/resources";
import { LambdaStack } from "./LambdaStack";

export default function RemixStack({ stack }: StackContext) {
  const { api } = use(LambdaStack);

  const site = new RemixSite(stack, "Site", {
    path: "remix-frontend/",
    environment: {
      API_URL: api.customDomainUrl || api.url,
    },
  });

  stack.addOutputs({
    URL: site.url,
  });
}
