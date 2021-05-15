import {Column} from './column.model';
import {Deserializable} from "../../common/models/deserializable.model";

export class Board implements Deserializable {

  id: number;
  name: string;
  columns: Column[];

  constructor(id: number, name: string, columns: Column[]) {
    this.id = id;
    this.name = name;
    this.columns = columns;
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
