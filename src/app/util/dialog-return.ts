import {DialogResult} from "./dialog-result";

export class DialogReturn<T> {
  public result: DialogResult;
  public data: T;

  constructor(result: DialogResult, data?: T) {
    this.result = result;
    this.data = data;
  }
}
