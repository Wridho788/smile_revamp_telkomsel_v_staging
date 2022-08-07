import {useState} from "react";

const useGeneralProgramRegistration = () => {
    const [step, setStep] = useState<number>(0)




    return{
        step,
        setStep,
    }
}

export default useGeneralProgramRegistration