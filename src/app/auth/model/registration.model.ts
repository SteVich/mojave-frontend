import {Deserializable} from "../../common/model/deserializable.mode";

export class Registration implements Deserializable {

  username: string;
  email: string;
  password: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

