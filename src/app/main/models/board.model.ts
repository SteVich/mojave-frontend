import {Column} from './column.model';
import {Deserializable} from "../../common/models/deserializable.model";

export class Board implements Deserializable {

  id?: number;
  name?: string;
  columns?: Column[];

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
