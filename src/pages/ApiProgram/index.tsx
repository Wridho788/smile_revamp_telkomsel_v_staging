import React, { FC, useEffect } from 'react';
import { useTypedSelector } from '../../app/hooks/useTypedSelector';
import { useActions } from '../../app/hooks/useActions';

const Index: FC = () => {
    const {result, error, loading} = useTypedSelector(state=>state.defaultList);
    const {getProgramList} = useActions();
    useEffect(()=>{
        getProgramList({});
    }, [result])


    if (error){
        return <h1 style={{color: 'red', fontWeight: '700'}}>{error}</h1>
    }
    if (loading){
        return <h1>Loading ...</h1>
    }
    return (
        <>
            <p>Program List</p>
            <div>
                {result.data.map(data => {
                    return <div key={data}>{data.name}</div>
                })} <br/>
            </div>
         </>
    );
};

export default Index
