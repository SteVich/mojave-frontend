import {Milestone} from "./milestone.model";
import {Assignee} from "./assignee.model";
import {Deserializable} from "../../common/models/deserializable.model";
import {Tag} from "./tag.model";

export class Task implements Deserializable {

  id: number;
  title: string;
  assignee: Assignee = new Assignee();
  dueDate: string;
  milestone: Milestone = new Milestone();
  priority: string;
  tag: Tag = new Tag();
  estimate: number;
  description: string;
  number: number;
  histories: History[];

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
