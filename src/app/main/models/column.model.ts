import {Task} from "./task.model";

export class Column {

  id?: number;
  name?: string;
  tasks?: Task[];

  constructor(id: number, name: string, tasks: Task[]) {
    this.id = id;
    this.name = name;
    this.tasks = tasks;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
