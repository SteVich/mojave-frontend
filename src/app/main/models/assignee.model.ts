import {Deserializable} from "../../common/models/deserializable.model";

export class Assignee implements Deserializable {

  id: number;
  username: string;
  email: string

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
