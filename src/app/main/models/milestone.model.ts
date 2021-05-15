import {Deserializable} from "../../common/models/deserializable.model";

export class Milestone implements Deserializable {

  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
