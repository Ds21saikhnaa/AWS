import { Person,PersonTable } from "../model/PersonModel.js";
import { MyError } from "../utils/myError.js";
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
    const body = JSON.parse(event.body);
    const person = await Person.create(body);
    return success(person)
}

export const updateUser = async (event, id) => {
    const body = JSON.parse(event.body);
    const find = await Person.get(id);
    if (!find) {
        throw new MyError("hereglegch oldsongui", 401);
    }
    for(let attr in body){
        find[attr] = body[attr];
    }
    await find.save();
    //const person = await Person.update(id, body);
    return success(find);
}

export const deleteUser = async(event, id) => {
    const person = await Person.get(id);
    if (!person) {
        throw new MyError("hereglegch oldsongui", 401);
    }
    await person.delete();
    return {
        statusCode: 200,
        body: JSON.stringify(
          {
            success: true,
            data: "done"
          },
          null,
          2
        ),
      };
}