import { Component } from "@serverless/core";
import AWS from "aws-sdk";

type NextjsComponentInput = {};

class NextjsComponent extends Component {
  async deploy(inputs: NextjsComponentInput): Promise<void> {
    const cloudFront = new AWS.CloudFront({
      credentials: this.credentials.aws
    });

    const lambda = new AWS.Lambda({
      credentials: this.credentials.aws
    });

    await cloudFront
      .createDistribution({
        DistributionConfig: {
          DefaultCacheBehavior: {
            MinTTL: 0,
            DefaultTTL: 0,
            MaxTTL: 0,
            ForwardedValues: {
              Cookies: {
                Forward: "all"
              },
              QueryString: true
            },
            AllowedMethods: {
              Quantity: 2,
              Items: ["HEAD", "GET"]
            }
          }
        }
      })
      .promise();

    await lambda.createFunction({});
  }
}

export default NextjsComponent;