import { StackContext, use, ViteStaticSite } from "@serverless-stack/resources";
import { LambdaStack } from "./LambdaStack";

export function QwikStack({ stack }: StackContext) {
  const { api } = use(LambdaStack);

  const site = new ViteStaticSite(stack, "SvelteSite", {
    path: "frontend-qwik",
    environment: {
      // Pass in the API endpoint to our app
      VITE_APP_API_URL: api.url,
    },
  });

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url,
  });
}
