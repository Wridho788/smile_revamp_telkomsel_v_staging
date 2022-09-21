interface IBucket {
  _id: string;
  location: string;
  name: string;
  balance: number;
  __v: number;
}

export interface ILocation {
  _id: string;
  code: string;
  name: string;
  type: string;
  __v: number;
  bucket?: IBucket[];
}

export interface IResponse {
  data: any[];
  total: number;
}
