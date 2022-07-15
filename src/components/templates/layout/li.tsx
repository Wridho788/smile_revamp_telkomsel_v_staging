import React, {FC} from "react";

interface LiProps {
    label: string,
    to: string,
    isActive: boolean,
}

const Index: FC<LiProps> = ({label, to, isActive}: LiProps) => {
    return (
        <li>
            <a href={to}
               className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
               aria-current="page">{label}</a>
        </li>
    );
}
export default Index;