import dynamoose from "dynamoose";
import { v4 as uuidv4 } from 'uuid';
const personSchema = new dynamoose.Schema(
    {
        id: {
            type: String,
            default: () => uuidv4(),
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: String
    },
    {
        saveUnknown: true,
        timestamps: true,
    }
);
export const Person = dynamoose.model("Person", personSchema);
export const PersonTable = new dynamoose.Table("PersonTable", [Person]);