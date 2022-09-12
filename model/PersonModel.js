import dynamoose from "dynamoose";
const personSchema = new dynamoose.Schema(
    {
        id: String,
        firstName: String,
        lastName: String
    },
    {
        saveUnknown: true,
        timestamps: true,
    }
);
export const Person = dynamoose.model("Person", personSchema);
export const PersonTable = new dynamoose.Table("PersonTable", [Person]);