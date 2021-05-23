import {Deserializable} from "./deserializable.model";

export class User implements Deserializable {

  id: number;
  name: string;
  username: string
  email: string
  imageUrl: string;
  role: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
