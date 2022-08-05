import React, { FC, useEffect } from 'react';
import { useTypedSelector } from '../../app/hooks/useTypedSelector';
import { useActions } from '../../app/hooks/useActions';

const Index: FC = () => {
    const {keywords, error, loading} = useTypedSelector(state=>state.keyword);
    const {getKeywordType} = useActions();
    useEffect(()=>{
        getKeywordType();
    }, [keywords])

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
                {keywords.main_info.keyword_type.map(data=>{
                    return <div key={data} >{data.set_value}</div>
                })}
            </div>

            <p>Program Type</p>
            <div>
                {keywords.segmentation.program_type.map(data=>{
                    return <div key={data} >{data.set_value}</div>
                })}
            </div>
        </>
    );
};

export default Index;