import React, {useState} from "react";
import CType from "./CType";

const useSegmentationLogic = () => {
    const [tab, setTab] = useState<string>("c-type")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };


    return{
        tab,
        changeTab,
    }
}

export default useSegmentationLogic