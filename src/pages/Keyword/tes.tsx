import {IMainInfo} from "../../app/redux/Utils/Interface/IProgram";
import React from "react";

interface Ha{
    mainInfo : IMainInfo
}
export const Tes = ({mainInfo} : Ha)=>{
    const result = mainInfo
    return (
        <>
            <p>Keyword Type</p>
            <div>
                {result.program_type.map(data=>{
                    return <div key={data} >{data.set_value}</div>
                })}
            </div>

        </>
    );
}
interface Ha{
    mainInfo : IMainInfo
}
export const Tes2 = ({mainInfo} : Ha)=>{
    const result = mainInfo
    return (
        <>
            <p>Keyword Type</p>
            <div>
                {result.program_type.map(data=>{
                    return <div key={data} >{data.set_value}</div>
                })}
            </div>

        </>
    );
}
