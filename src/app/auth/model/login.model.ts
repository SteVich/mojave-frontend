import {Deserializable} from "../../common/models/deserializable.model";

export class Login implements Deserializable {

  usernameOrEmail: string;
  password: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

