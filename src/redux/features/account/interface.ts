export interface IData {
  _id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  job_title: string;
  job_level: string;
  phone: string;
  name: string;
}
export interface IResponse {
  data: Array<IData>;
  total: number;
}

export interface IResponseAuthenticate {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  job_title: string;
  job_level: string;
  identification: {
    employee_no: string;
  };
  birthdate: any;
  status: string;
  last_access_time: string;
  role: string;
  role_id: string;
  __v: number;
  account_location:any;
}

export interface IProgramImportFile {
  file: any;
  type: string;
}
