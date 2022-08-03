import * as React from "react";
import {Select} from "../../../atoms";

interface IMainInfo {
}

const Index: React.FunctionComponent<IMainInfo> = (props) => {
    const [type, setType] = React.useState("");
    const typeOptions = ["Type 1", "Type 2", "Type 3"];
    React.useEffect(() => {
        console.log(type);
    }, [type]);
    return (
        <>
            <Select
                placeholder="Option"
                options={typeOptions}
                returnedValue={type}
                setReturnedValue={setType}
            />
        </>
    );
};

export default Index;
