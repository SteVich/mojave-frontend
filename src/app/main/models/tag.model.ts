import {Deserializable} from "../../common/models/deserializable.model";

export class Tag implements Deserializable {

  id?: number;
  name?: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
