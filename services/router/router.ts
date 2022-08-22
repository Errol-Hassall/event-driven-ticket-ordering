import AWS from "aws-sdk";
import { PutEventsRequestEntryList } from "aws-sdk/clients/eventbridge";

const router = new AWS.EventBridge();

/**
 * Sends an entry to the router
 * @param entries store entry type
 * @returns the success of the router or not
 */
export const sendToRouter = async (entries: PutEventsRequestEntryList) => {
  return await router
    .putEvents({
      Entries: entries,
    })
    .promise();
};
