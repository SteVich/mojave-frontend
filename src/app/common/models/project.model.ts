import {Deserializable} from "./deserializable.model";
import {Milestone} from "../../main/models/milestone.model";
import {Tag} from "../../main/models/tag.model";

export class Project implements Deserializable {

  id?: number;
  name?: string;
  imageUrl?: string;
  description?: string;
  milestones?: Milestone[] = [];
  tags?: Tag[] = [];

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
