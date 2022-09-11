import aws from "aws-sdk";

export const sendEmail = async ({ email, tickets }) => {
  // Create sendEmail params
  var params = {
    Destination: {
      /* required */
      CcAddresses: [
        email,
        /* more items */
      ],
      ToAddresses: [
        email,
        /* more items */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: "Tickets:",
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Tickets",
      },
    },
    Source: email /* required */,
    ReplyToAddresses: [
      email,
      /* more items */
    ],
  };

  return await new aws.SES({
    apiVersion: "2010-12-01",
    region: "ap-southeast-2",
  })
    .sendEmail(params)
    .promise();
};
