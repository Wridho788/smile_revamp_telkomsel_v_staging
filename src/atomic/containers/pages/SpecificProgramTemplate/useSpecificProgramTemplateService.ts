import {useState} from "react";

const useSpecificProgramTemplateService = () => {
    const [step, setStep] = useState<number>(1)




    return{
        step,
        setStep
    }
}

export default useSpecificProgramTemplateService