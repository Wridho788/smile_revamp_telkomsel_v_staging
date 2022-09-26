import { IData } from "../../../redux/features/program/interface"
import { IFilter, IProgramApproval } from "./interface";

export const ProgramItemInitial: IData = {
  _id: "",
  name: "",
  desc: "",
  start_period: "",
  end_period: "",
  point_type: "",
  program_mechanism: "",
  program_owner: "",
  logic: "",
  c_los_enable: "",
  c_los_value: "",
  c_los_balance: "",
  program_owner_detail: "",
  createdAt: "",
  deletedAt: "",
  __v: 0,
  status: {
    _id: "",
    set_value: "",
  },
  program_notification: [],
};

export const InitialFilter: IFilter = {
  program_approval: {
    _id: "",
    name: "",
  },
  program_experience: {
    _id: "",
    name: "",
  },
};

export const InitialProgramApproval: IProgramApproval = {
  _id: "",
  group_name: "",
  set_value: "",
  created_by: "",
  created_at: "",
  updated_at: "",
  deleted_at: null,
  __v: 0,
};
