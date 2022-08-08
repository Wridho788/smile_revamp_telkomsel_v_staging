import React, {FC, useEffect, useState} from 'react';
import {useTypedSelector} from '../../app/hooks/useTypedSelector';
import {useActions} from '../../app/hooks/useActions';
import {Button} from "@mui/material";

const Index: FC = () => {
    const {result, error, loading} = useTypedSelector(state => state.defaultList);
    const {customerList, customerTierList, customerBadgeList, customerBrandList, locationList} = useActions();
    useEffect(() => {
        customerTierList({});
    }, [result])

    const [value, setValue] = useState(result);
    const onClickCard = (id: number) => {
        switch (id) {
            case 1 :
                return customerList({})
            case 2:
                return customerTierList({})
            case 3:
                return customerBadgeList({})
            case 4 :
                return customerBrandList({})
            case 5 :
                return locationList({})

        }
    }
    if (error) {
        return <h1 style={{color: 'red', fontWeight: '700'}}>{error}</h1>
    }
    if (loading) {
        return <h1>Loading ...</h1>
    }
    return (
        <>
            <p>Program Type</p>
            {value.data.map(data => {
                return <div key={data}>{data.name}</div>
            })} <br/>
            <Button variant={"outlined"} onClick={() => onClickCard(1)}>MSSIDN</Button>
            <Button variant={"outlined"} onClick={() => onClickCard(2)}>C.Tear</Button>
            <Button variant={"outlined"} onClick={() => onClickCard(3)}>C.Badge</Button>
            <Button variant={"outlined"} onClick={() => onClickCard(4)}>C.Brand</Button>
            <Button variant={"outlined"} onClick={() => onClickCard(5)}>C.Location</Button>
        </>
    );
};

export default Index;
