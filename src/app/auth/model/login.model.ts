import {Deserializable} from "../../common/models/deserializable.mode";

export class Login implements Deserializable {

  usernameOrEmail: string;
  password: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

