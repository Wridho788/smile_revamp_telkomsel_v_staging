import React, { FC, useEffect } from 'react';
import { useTypedSelector } from '../../app/hooks/useTypedSelector';
import { useActions } from '../../app/hooks/useActions';
import {IMainInfo, IProgramPageData} from "../../app/redux/Utils/Interface/IProgram";

import {MainInfoInitial} from "../../app/redux/Utils/InitialState/ProgramInitial";
import {Tes, Tes2} from "../Keyword/tes";
import {Button} from "@mui/material";
const Index: FC = () => {
    const {result, error, loading} = useTypedSelector(state=>state.program);
    const {getProgramPage} = useActions();
    useEffect(()=>{
        getProgramPage();
    }, [result])

    function handleOrangeClick(id:number) {
        if(id === 1){
            MainInfoInitial.program_type = ["be","be"]

            console.log(MainInfoInitial)
        return <Tes mainInfo={MainInfoInitial}/>
        }

        console.log(MainInfoInitial)
        MainInfoInitial.program_type = ["we","we"]
        return <Tes2 mainInfo={MainInfoInitial}/>
    }
    if (error){
        return <h1 style={{color: 'red', fontWeight: '700'}}>{error}</h1>
    }
    if (loading){
        return <h1>Loading ...</h1>
    }
    return (
        <>
            <p>Keyword Type</p>
            <div>
                {result.main_info.program_type.map(data=>{
                    return <div key={data} >{data.set_value}</div>
                })}
            </div>
            <Button variant={"outlined"} onClick={()=> handleOrangeClick(1)}> Kik </Button>
            <Button variant={"outlined"} onClick={()=> handleOrangeClick(2)}> Kik </Button>
        </>
    );
};

export default Index
