import { Action } from '@ngrx/store';

export const UPDATE = '[tip] update';
export const READ = '[tip] read';


export class Update implements Action {
  readonly type = UPDATE;
  payload: number;
  constructor(num:number) {
    this.payload = num;
  }
}

export class Read  implements Action {
  readonly type = READ
  payload:string;
  constructor(id:string) {
    this.payload = id;
  }
}

export type TipActions = Update | Read ;
