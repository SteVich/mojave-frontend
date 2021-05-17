import {Deserializable} from "./deserializable.model";

export class Project implements Deserializable {

  id: number;
  name: string;
  imageUrl: string

  constructor(id: number, name: string, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
