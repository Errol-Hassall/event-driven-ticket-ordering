import { Bucket, StackContext } from "@serverless-stack/resources";

export function StorageStack({ stack }: StackContext) {
  const bucket = new Bucket(stack, "Bucket");

  return {
    bucket,
  };
}
