import {Deserializable} from "../../common/models/deserializable.model";

export class Registration implements Deserializable {

  username: string;
  email: string;
  password: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

