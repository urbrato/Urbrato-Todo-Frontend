import {Pageable} from "./pageable";
import {Sort} from "./sort";

export class Page<T> {
  public content?: T[];
  public pageable?: Pageable;
  public totalPages?: number;
  public totalElements?: number;
  public last?: boolean;
  public numberOfElements?: number;
  public first?: boolean;
  public size?: number;
  public number?: number;
  public sort?: Sort;
  public empty?: boolean;
}
