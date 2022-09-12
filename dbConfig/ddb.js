import dynamoose from "dynamoose";
export const connectDDb = () => {
    const ddb = new dynamoose.aws.ddb.DynamoDB({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: "ap-southeast-1",
      });
      dynamoose.aws.ddb.set(ddb);
}