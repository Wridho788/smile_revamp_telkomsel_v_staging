import * as React from "react";
import {DrawerNav, H1} from "../../components";
import {useParams} from "react-router-dom";
import {useTypedSelector} from "../../app/hooks/useTypedSelector";
import {useActions} from "../../app/hooks/useActions";
import {useEffect} from "react";

 const DetailProgramPage = () => {

     let { _id } = useParams();
     const {result, error, loading} = useTypedSelector(state => state.programDetail);
     const {programDetail} = useActions();
     useEffect(() => {
         programDetail(_id ?? '')
     }, [result])
    return (
        <DrawerNav>
            <H1>{result.program_bonus}</H1>
        </DrawerNav>
    );
}
export default DetailProgramPage


