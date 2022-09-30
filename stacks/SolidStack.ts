import { StackContext, use, ViteStaticSite } from "@serverless-stack/resources";
import { LambdaStack } from "./LambdaStack";

export function SolidStack({ stack }: StackContext) {
  const { api } = use(LambdaStack);

  const site = new ViteStaticSite(stack, "SolidSite", {
    path: "frontend-solid",
    environment: {
      VITE_APP_API_URL: api.url,
    },
  });

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url,
  });
}
