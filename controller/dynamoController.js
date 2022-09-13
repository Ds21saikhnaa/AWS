import { Person,PersonTable } from "../model/PersonModel.js";
import { MyError } from "../utils/myError.js";
import { v4 as uuidv4 } from 'uuid';
import {success} from "../utils/mySuccess.js"

export const createPersonTable = async(event) => {
    try {
        await PersonTable.create();
    } catch (e) {
        console.log("error");
    }
}

export const getPerson = async(event) => {
    const person = await Person.scan().exec();
    return success(person)
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify({
    //         success: true,
    //         data: person.toJSON()
    //     }),
    // };
}

export const findPerson = async (event, id) => {
    const person = await Person.query("id").eq(id).exec();
    if (!person) {
        throw new MyError("ene hereglegch bhgui bn", 401)
    }
    return success(person);
}

export const createUser = async (event) => {
    const body = JSON.parse(event.body)
    const person = await Person.create(body);
    return success(person)
}