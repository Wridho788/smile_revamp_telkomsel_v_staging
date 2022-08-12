import React, { FC, useEffect } from 'react';
import { useTypedSelector } from '../../app/hooks/useTypedSelector';
import { useActions } from '../../app/hooks/useActions';
import {CreateProgramInitial} from "../../app/redux/Utils/InitialState/ProgramInitial";

const Index: FC = () => {
    const {result, error, loading} = useTypedSelector(state=>state.createProgram);
    const {createProgram} = useActions();
    useEffect(()=>{
        createProgram(CreateProgramInitial);
    }, [result])

    if (error){
        return <h1 style={{color: 'red', fontWeight: '700'}}>{error}</h1>
    }
    if (loading){
        return <h1>Loading ...</h1>
    }
    return (
        <>
            <p> Program Name</p>
            <p>{result.name}</p>
        </>
    );
};

export default Index;
