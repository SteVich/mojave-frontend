import {Deserializable} from "../../common/models/deserializable.model";
import {User} from "../../common/models/user.model";

export class History implements Deserializable {

  id: number;
  user: User;
  message: string;
  date: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
