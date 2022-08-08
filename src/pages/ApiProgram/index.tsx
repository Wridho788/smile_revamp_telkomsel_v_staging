import React, { FC, useEffect } from 'react';
import { useTypedSelector } from '../../app/hooks/useTypedSelector';
import { useActions } from '../../app/hooks/useActions';

const Index: FC = () => {
    const {result, error, loading} = useTypedSelector(state=>state.program);
    const {getProgramPage} = useActions();
    useEffect(()=>{
        getProgramPage();
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
            <div>
                {result.main_info.program_type.map(data=>{
                    return <div key={data} >{data.set_value}</div>
                })}
            </div>

            <p>Program Notification</p>
            <div>
                {result.notification.via.map(data=>{
                    return <div key={data} >{data.set_value}</div>
                })}
            </div>
        </>
    );
};

export default Index;
