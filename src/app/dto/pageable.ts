import {Sort} from "./sort";

export class Pageable {
  public sort?: Sort;
  public pageNumber?: number;
  public pageSize?: number;
  public offset?: number;
  public unpaged?: boolean;
  public paged?: boolean;
}
