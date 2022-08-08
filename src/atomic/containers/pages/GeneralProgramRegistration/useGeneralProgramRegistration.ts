import {useEffect, useState} from "react";
import {useTypedSelector} from "../../../../app/hooks/useTypedSelector";
import {useActions} from "../../../../app/hooks/useActions";

// SEMUA DATA YANG AKAN DIKIRIMKAN UNTUK CREATE PROGRAM DIKUMPULKAN DIDALAM HOOKS INI

const useGeneralProgramRegistration = () => {
    const {result, error, loading} = useTypedSelector(state=>state.program);
    const {getProgramPage} = useActions();

    const [step, setStep] = useState<number>(0)
    const [notification, setNotification] = useState<any>([])

    // User Input
    const [mainInfoSummaryInput, setMainInfoSummaryInput] = useState({
        name: "",
        point_type: "",
        mechanism: "",
        owner: "",
        owner_detail: "",
        start_period: "",
        end_period: "",
        c_poin_balance: 0,
        c_los_enable:false,
        c_los_type:false,
        c_los_value:false
    })


    useEffect(()=>{
        getProgramPage();
    }, [result])

    return{
        result,

        // INI DIKIRIM KE SEMUA KOMPONEN FORM PROGRAM REGISTRATION
        step,
        setStep,

        // INI DIKIRIM KE FORM NOTIFIKASI SAJA, DATA DARI FORM NOTIFIKASI HARUS DIKUMPULKAN DAN DIKIRIM MELALUI INI
        notification,
        setNotification,

        mainInfoSummaryInput,
        setMainInfoSummaryInput
    }
}

export default useGeneralProgramRegistration
