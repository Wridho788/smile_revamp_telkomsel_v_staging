import React, { FC, useEffect } from 'react';
import { useTypedSelector } from '../../app/hooks/useTypedSelector';
import { useActions } from '../../app/hooks/useActions';
import {CreateKeywordInitial} from "../../app/redux/Utils/InitialState/KeywordInitial"

const Index: FC = () => {
    const {result, error, loading} = useTypedSelector(state=>state.createKeyword);
    const {createKeyword} = useActions();
    useEffect(()=>{
        createKeyword();
    }, [result])

    if (error){
        return <h1 style={{color: 'red', fontWeight: '700'}}>{error}</h1>
    }
    if (loading){
        return <h1>Loading ...</h1>
    }
    return (
        <>
            <p>Keyword Type</p>
            <p>{result.name}</p>
        </>
    );
};

export default Index;
