import {IParams} from "./IGeneral";
import {IPayload} from "../features/program/interface";

export const FilterInitial: IParams = {
    limit: 100,
    skip: 0,
    filter: '{}',
    sort: '{}'
}

export const BooleanOption = [
    {_id: true, set_value: "True"},
    {_id: false, set_value: "False"},
];

export const PointValueOption = [
    {_id: "Fixed", set_value: "Fixed"},
    {_id: "Flexible", set_value: "Flexible"},
    {_id: "Fixed-Multiple", set_value: "Fixed-Multiple"},
];
export const MaxModeOption = [
    {_id: "Day", set_value: "Day"},
    {_id: "Month", set_value: "Month"},
    {_id: "Year", set_value: "Year"},
    {_id: "Shift", set_value: "Shift"},
    {_id: "Program", set_value: "Program"},
];
export const TelkomselLOSTypeOption = [
    {_id: "Day", set_value: "Day"},
    {_id: "Month", set_value: "Month"},
    {_id: "Year", set_value: "Year"},
];
export const TelkomselLOSOperatorOption = [
    {_id: "LessThan", set_value: "LessThan"},
    {_id: "LessOrEqualTo", set_value: "LessOrEqualTo"},
    {_id: "EqualTo", set_value: "EqualTo"},
    {_id: "MoreThan", set_value: "MoreThan"},
    {_id: "MoreOrEqualTo", set_value: "MoreOrEqualTo"},
    {_id: "Ranged", set_value: "Ranged"},
];

export const logicOption = [
    {_id: "Union", set_value: "Union"},
    {_id: "Intersection", set_value: "Intersection"},
]

export const programTimeZoneOption = [
    {_id: "WIB", set_value: "WIB"},
    {_id: "WITA", set_value: "WITA"},
    {_id: "WIT", set_value: "WIT"},
]

export const PicTypeOption = [
    {_id: "PIC", set_value: "PIC"},
    {_id: "Role", set_value: "Role"},
]
export const ThresholdAlarmExpiredOption = [
    {_id: "0", set_value: "Option"},
    {_id: "1", set_value: "H-1"},
    {_id: "2", set_value: "H-2"},
    {_id: "3", set_value: "H-3"},
    {_id: "4", set_value: "H-4"},
    {_id: "5", set_value: "H-5"},
    {_id: "6", set_value: "H-6"},
    {_id: "7", set_value: "H-7"},
]

export const PayloadInitial : IPayload = {
   payload: {
       data: [],
       totalRecords: 0
   }
}
