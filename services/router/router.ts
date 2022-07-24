import AWS from "aws-sdk";

const router = new AWS.EventBridge();

export const sendToRouter = async (entries) => {
  await router
    .putEvents({
      Entries: entries,
    })
    .promise();
};
