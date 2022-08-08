import {useState} from "react";

interface SelectedList {
    id:number,
    value:string
}

const useCtypeLogic = () => {
    const [selectedList, setSelectedList] = useState<Array<SelectedList>>([])

    const addToSelectedList = (obj:SelectedList) => {
        setSelectedList([...selectedList, obj])
    }

    const removeFromSelectedList = (obj:SelectedList) => {
        const filteredSelectedList = selectedList.filter(doc => doc.id !== obj.id)
        setSelectedList(filteredSelectedList)
    }

    return {
        selectedList,
        addToSelectedList,
        removeFromSelectedList
    }
}

export default useCtypeLogic