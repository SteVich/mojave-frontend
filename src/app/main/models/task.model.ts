import {Milestone} from "./milestone.model";
import {Assignee} from "./assignee.model";
import {Deserializable} from "../../common/models/deserializable.model";

export class Task implements Deserializable {

  id: number;
  title: string;
  assignee: Assignee;
  dueDate: string;
  milestone: Milestone;
  priority: string;
  tag: string;
  estimate: number;
  description: string;
  number: number;
  history: History;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
