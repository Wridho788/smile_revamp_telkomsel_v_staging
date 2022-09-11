interface IData {
  _id: string;
  group_name: string;
  set_value: string;
  __v: number;
}
export interface IResponse {
  data: Array<IData>;
  total: number;
}
export interface IParams {
  limit?: number;
  skip?: number;
  filter?: any;
  sort?: any;
  lazyEvent?: any;
  type?:string,
  program?:string

}
export interface IParamsPrime {
  first?: number;
  rows?: number;
  sortField?: string;
  sortOrder?: number;
  filters?: any;
}

export interface IParamsPrime {
  lazyEvent: string;
}
export interface IParamDetail {
  _id: string;
}
