import {useState} from "react";

// SEMUA DATA YANG AKAN DIKIRIMKAN UNTUK CREATE PROGRAM DIKUMPULKAN DIDALAM HOOKS INI

const useGeneralProgramRegistration = () => {
    const [step, setStep] = useState<number>(0)
    const [notification, setNotification] = useState<any>([])




    return{

        // INI DIKIRIM KE SEMUA KOMPONEN FORM PROGRAM REGISTRATION
        step,
        setStep,

        // INI DIKIRIM KE FORM NOTIFIKASI SAJA, DATA DARI FORM NOTIFIKASI HARUS DIKUMPULKAN DAN DIKIRIM MELALUI INI
        notification,
        setNotification
    }
}

export default useGeneralProgramRegistration