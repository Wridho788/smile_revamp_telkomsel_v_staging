import { IPm } from 'redux/features/pic/interface';

const PicInital: IPm = {
  _id: '',
  name: '',
  msisdn: '',
  email: '',
  created_at: '',
  updated_at: '',
  deleted_at: '',
  created_by: {
    _id: '',
    user_id: '',
    user_name: '',
    first_name: '',
    last_name: '',
    job_title: '',
    job_level: '',
    phone: '',
    email: '',
    role: '',
    created_at: '',
    updated_at: '',
    _v: 0,
    role_detail: {
      _id: '',
      rode_id: '',
      name: '',
      status: '',
      desc: '',
      authorizes: [''],
    },
    account_location: {
      location: '',
      _v: '',
      location_detail: {
        code: '',
        name: '',
      },
    },
  },
};

export default PicInital;
